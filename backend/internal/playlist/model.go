package playlist

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

const PLAYLIST_COLLECTION = "playlists"

type Playlist struct {
	ID            primitive.ObjectID `form:"-" json:"id" bson:"_id,omitempty"`
	Name          string             `form:"name" json:"name,omitempty" bson:"name,omitempty"`
	ThumbnailPath string             `form:"-" json:"thumbnailPath,omitempty" bson:"thumbnailPath,omitempty"`
	SongList      []string           `form:"-" json:"songList,omitempty" bson:"songList,omitempty"`
	CreatedAt     time.Time          `form:"-" json:"createdAt,omitempty" bson:"createdAt,omitempty"`
	UpdatedAt     time.Time          `form:"-" json:"updatedAt,omitempty" bson:"updatedAt,omitempty"`
}

type AddPlaylistPayload struct {
	MusicId     string   `json:"musicId"`
	PlaylistIds []string `json:"playlistIds"`
}
