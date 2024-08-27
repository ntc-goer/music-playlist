package musictrack

import (
	"backend/pkg/database"
	"go.mongodb.org/mongo-driver/mongo"
)

type Repository struct {
	Collection database.CollectionInterface
}

func NewRepository(db *mongo.Database) *Repository {
	return &Repository{
		Collection: db.Collection(MUSIC_TRACK_COLLECTION),
	}
}
