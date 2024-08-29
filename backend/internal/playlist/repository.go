package playlist

import (
	"backend/pkg/database"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"sort"
	"time"
)

type Repository struct {
	Collection database.CollectionInterface
}

func NewRepository(db *mongo.Database) *Repository {
	return &Repository{
		Collection: db.Collection(PLAYLIST_COLLECTION),
	}
}

func (r *Repository) Get(ctx context.Context, keyword string, opts *options.FindOptions) ([]*Playlist, error) {
	opts.Sort = bson.M{
		"createdAt": -1,
	}
	filter := bson.M{
		"name": bson.M{"$regex": keyword, "$options": "i"},
	}
	cur, err := r.Collection.Find(ctx, filter, opts)
	if err != nil {
		return nil, err
	}
	result := make([]*Playlist, 0)
	if err := cur.All(ctx, &result); err != nil {
		return nil, err
	}
	return result, nil
}

func (r *Repository) GetById(ctx context.Context, id primitive.ObjectID) (*Playlist, error) {
	res := r.Collection.FindOne(ctx, bson.M{"_id": id}, nil)
	var plItem Playlist
	if err := res.Decode(&plItem); err != nil {
		return nil, err
	}
	pipeline := mongo.Pipeline{
		{{"$match", bson.D{{"_id", id}}}},
		// $addFields stage
		{{"$addFields", bson.D{
			{"songListObjId", bson.D{
				{"$map", bson.D{
					{"input", "$songList"},
					{"as", "songList"},
					{"in", bson.D{{"$toObjectId", "$$songList"}}},
				}},
			}},
		}}},
		// $lookup stage
		{{"$lookup", bson.D{
			{"from", "music_tracks"},
			{"localField", "songListObjId"},
			{"foreignField", "_id"},
			{"as", "songDetailList"},
		}}},
	}

	// Execute the aggregation
	cursor, err := r.Collection.Aggregate(ctx, pipeline)
	if err != nil {
		log.Fatal(err)
	}
	defer cursor.Close(ctx)

	// Process the results
	var results []Playlist
	if err = cursor.All(ctx, &results); err != nil {
		log.Fatal(err)
	}
	if len(results) == 0 {
		return nil, nil
	}
	// Keep the songList
	orderMap := make(map[string]int)
	for index, id := range plItem.SongList {
		orderMap[id] = index
	}
	sort.Slice(results[0].SongDetailList, func(i, j int) bool {
		return orderMap[results[0].SongDetailList[i].ID.Hex()] < orderMap[results[0].SongDetailList[j].ID.Hex()]
	})
	return &results[0], nil
}

func (r *Repository) UpsertMusicPlaylist(ctx context.Context, musicId string, playlistId primitive.ObjectID) error {
	upsert := true
	_, err := r.Collection.UpdateOne(ctx, bson.M{"_id": playlistId}, bson.M{
		"$addToSet": bson.M{"songList": musicId}, // Replace with your field and value
	}, &options.UpdateOptions{
		Upsert: &upsert,
	})
	if err != nil {
		return err
	}
	return nil
}

func (r *Repository) RemoveMusicFromPlaylist(ctx context.Context, musicId string) error {
	_, err := r.Collection.UpdateMany(ctx, bson.M{}, bson.M{"$pull": bson.M{
		"songList": musicId,
	}})
	return err
}

func (r *Repository) DeleteById(ctx context.Context, id primitive.ObjectID) error {
	_, err := r.Collection.DeleteOne(ctx, bson.M{"_id": id})
	return err
}

func (r *Repository) Create(ctx context.Context, data *Playlist) (*Playlist, error) {
	data.CreatedAt = time.Now().UTC()
	res, err := r.Collection.InsertOne(ctx, data)
	if err != nil {
		return nil, err
	}
	data.ID = res.InsertedID.(primitive.ObjectID)
	return data, nil
}

func (r *Repository) UpdateOne(ctx context.Context, data *Playlist) (*Playlist, error) {
	data.UpdatedAt = time.Now().UTC()
	_, err := r.Collection.UpdateOne(ctx, bson.M{
		"_id": data.ID,
	}, bson.M{
		"$set": data,
	})
	if err != nil {
		return nil, err
	}
	return data, nil
}
