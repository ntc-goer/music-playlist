package playlist

import (
	"backend/pkg/database"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
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
	res := r.Collection.FindOne(ctx, bson.M{"_id": id})
	var playlist Playlist
	if err := res.Decode(&playlist); err != nil {
		return nil, err
	}
	return &playlist, nil
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
