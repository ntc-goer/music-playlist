package musictrack

const MUSIC_TRACK_COLLECTION = "music_tracks"

type MusicTrack struct {
	Name        string `form:"name"`
	Album       string `form:"album"`
	Artist      string `form:"artist"`
	Genre       string `form:"genre"`
	ReleaseYear int    `form:"releaseYear"`
	Duration    int    `form:"duration"`

	// File fields
	File      int `form:"file"`
	Thumbnail int `form:"thumbnail"`
}
