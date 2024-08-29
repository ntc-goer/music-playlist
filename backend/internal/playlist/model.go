package playlist

import (
	"backend/internal/musictrack"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

const PLAYLIST_COLLECTION = "playlists"

type Playlist struct {
	ID             primitive.ObjectID       `form:"-" json:"id" bson:"_id,omitempty"`
	StringID       string                   `form:"id" json:"-" bson:"-"`
	Name           string                   `form:"name" json:"name,omitempty" bson:"name,omitempty"`
	ThumbnailPath  string                   `form:"-" json:"thumbnailPath,omitempty" bson:"thumbnailPath,omitempty"`
	SongList       []string                 `form:"-" json:"songList,omitempty" bson:"songList,omitempty"`
	SongDetailList []*musictrack.MusicTrack `form:"-" json:"songDetailList,omitempty" bson:"songDetailList,omitempty"`
	CreatedAt      time.Time                `form:"-" json:"createdAt,omitempty" bson:"createdAt,omitempty"`
	UpdatedAt      time.Time                `form:"-" json:"updatedAt,omitempty" bson:"updatedAt,omitempty"`

	Thumbnail string `form:"-" json:"-" bson:"-"`
}

type AddPlaylistPayload struct {
	MusicId     string   `json:"musicId"`
	PlaylistIds []string `json:"playlistIds"`
}
