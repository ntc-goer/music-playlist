package musictrack

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
		Collection: db.Collection(MUSIC_TRACK_COLLECTION),
	}
}

func (r *Repository) Get(ctx context.Context, keyword string, opts *options.FindOptions) ([]*MusicTrack, error) {
	opts.Sort = bson.M{
		"createdAt": -1,
	}
	filter := bson.M{
		"$or": []bson.M{
			{"name": bson.M{"$regex": keyword, "$options": "i"}},
			{"artist": bson.M{"$regex": keyword, "$options": "i"}},
			{"album": bson.M{"$regex": keyword, "$options": "i"}},
			{"genre": bson.M{"$regex": keyword, "$options": "i"}},
		},
	}
	cur, err := r.Collection.Find(ctx, filter, opts)
	if err != nil {
		return nil, err
	}
	result := make([]*MusicTrack, 0)
	if err := cur.All(ctx, &result); err != nil {
		return nil, err
	}
	return result, nil
}

func (r *Repository) GetById(ctx context.Context, id primitive.ObjectID) (*MusicTrack, error) {
	res := r.Collection.FindOne(ctx, bson.M{"_id": id})
	var song MusicTrack
	if err := res.Decode(&song); err != nil {
		return nil, err
	}
	return &song, nil
}

func (r *Repository) DeleteById(ctx context.Context, id primitive.ObjectID) error {
	_, err := r.Collection.DeleteOne(ctx, bson.M{"_id": id})
	return err
}

func (r *Repository) Create(ctx context.Context, data *MusicTrack) (*MusicTrack, error) {
	data.CreatedAt = time.Now().UTC()
	res, err := r.Collection.InsertOne(ctx, data)
	if err != nil {
		return nil, err
	}
	data.ID = res.InsertedID.(primitive.ObjectID)
	return data, nil
}

func (r *Repository) UpdateOne(ctx context.Context, data *MusicTrack) (*MusicTrack, error) {
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
