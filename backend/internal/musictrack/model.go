package musictrack

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

const MUSIC_TRACK_COLLECTION = "music_tracks"

type MusicTrack struct {
	ID            primitive.ObjectID `form:"-" json:"id" bson:"_id,omitempty"`
	Name          string             `form:"name" json:"name,omitempty" bson:"name,omitempty"`
	Album         string             `form:"album" json:"album,omitempty" bson:"album,omitempty"`
	Artist        string             `form:"artist" json:"artist,omitempty" bson:"artist,omitempty"`
	Genre         string             `form:"genre" json:"genre,omitempty" bson:"genre,omitempty"`
	ReleaseYear   int                `form:"releaseYear" json:"releaseYear,omitempty" bson:"releaseYear,omitempty"`
	Duration      int                `form:"duration" json:"duration,omitempty" bson:"duration,omitempty"`
	CreatedAt     time.Time          `form:"-" json:"createdAt,omitempty" bson:"createdAt,omitempty"`
	UpdatedAt     time.Time          `form:"-" json:"updatedAt,omitempty" bson:"updatedAt,omitempty"`
	ThumbnailName string             `form:"-" json:"thumbnailName,omitempty" bson:"thumbnailName,omitempty"`
	SongFileName  string             `form:"-" json:"songFileName,omitempty" bson:"songFileName,omitempty"`
}
