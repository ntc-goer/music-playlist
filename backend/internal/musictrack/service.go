package musictrack

import (
	"backend/config"
	"backend/internal/utils"
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"os"
	"path/filepath"
)

type Service struct {
	Repository *Repository
	Config     *config.Config
}

func NewService(r *Repository, cfg *config.Config) *Service {
	return &Service{
		Repository: r,
		Config:     cfg,
	}
}

func (s *Service) Get(ctx context.Context, keyword string, opts *options.FindOptions) ([]*MusicTrack, error) {
	tracks, err := s.Repository.Get(ctx, keyword, opts)
	if err != nil {
		return nil, err
	}
	for _, track := range tracks {
		if track.ThumbnailName != "" {
			track.ThumbnailName = fmt.Sprintf("thumbnails/%s", track.ThumbnailName)
		}
		if track.SongFileName != "" {
			track.SongFileName = fmt.Sprintf("songs/%s", track.SongFileName)
		}
	}
	return tracks, nil
}

func (s *Service) GetById(ctx context.Context, id primitive.ObjectID) (*MusicTrack, error) {
	track, err := s.Repository.GetById(ctx, id)
	if err != nil {
		return nil, err
	}
	track.ThumbnailName = fmt.Sprintf("thumbnails/%s", track.ThumbnailName)
	track.SongFileName = fmt.Sprintf("songs/%s", track.SongFileName)

	return track, nil
}

func (s *Service) CreateOne(ctx context.Context, data *MusicTrack, songFile *utils.FileData, thumbnail *utils.FileData) (*MusicTrack, error) {
	data.SongFileName = utils.GenFileName(songFile.Header.Filename)
	err := utils.SaveFile("data/songs", data.SongFileName, songFile.Data)
	if err != nil {
		return nil, err
	}
	if thumbnail.Header != nil {
		data.ThumbnailName = utils.GenFileName(thumbnail.Header.Filename)
		err := utils.SaveFile(s.Config.FilePath.Thumbnail, data.ThumbnailName, thumbnail.Data)
		if err != nil {
			return nil, err
		}
	}
	res, err := s.Repository.Create(ctx, data)
	return res, err
}

func (s *Service) UpdateOne(ctx context.Context, data *MusicTrack, songFile *utils.FileData, thumbnail *utils.FileData) (*MusicTrack, error) {
	// get updated music track
	track, err := s.Repository.GetById(ctx, data.ID)
	if err != nil {
		return nil, err
	}
	if data.File == "" && songFile.Header != nil {
		// Remove old file
		if err := os.Remove(filepath.Join(s.Config.FilePath.MusicTrack, track.SongFileName)); err != nil {
			log.Printf("Delete song error %s", err.Error())
		}
		// Upload new file
		track.SongFileName = utils.GenFileName(songFile.Header.Filename)
		err := utils.SaveFile(s.Config.FilePath.MusicTrack, track.SongFileName, songFile.Data)
		if err != nil {
			return nil, err
		}
	}

	if data.Thumbnail == "" && thumbnail.Header != nil {
		// Remove old file
		if err := os.Remove(filepath.Join(s.Config.FilePath.Thumbnail, track.ThumbnailName)); err != nil {
			log.Printf("Delete song error %s", err.Error())
		}
		// Upload new file
		track.ThumbnailName = utils.GenFileName(thumbnail.Header.Filename)
		err := utils.SaveFile(s.Config.FilePath.Thumbnail, track.ThumbnailName, thumbnail.Data)
		if err != nil {
			return nil, err
		}
	}
	// Update old track
	track.Name = data.Name
	track.Album = data.Album
	track.Artist = data.Artist
	track.Genre = data.Genre
	track.ReleaseYear = data.ReleaseYear
	track.Duration = data.Duration

	newTrack, err := s.Repository.UpdateOne(ctx, track)
	return newTrack, err
}

func (s *Service) DeleteById(ctx context.Context, id primitive.ObjectID) error {
	song, err := s.Repository.GetById(ctx, id)
	if err != nil {
		return err
	}
	if song.ThumbnailName != "" {
		// Delete thumbnail
		if err := os.Remove(filepath.Join(s.Config.FilePath.Thumbnail, song.ThumbnailName)); err != nil {
			log.Printf("Delete thumbnail error %s", err.Error())
		}
	}
	if song.SongFileName != "" {
		// Delete song
		if err := os.Remove(filepath.Join(s.Config.FilePath.MusicTrack, song.SongFileName)); err != nil {
			log.Printf("Delete song file error %s", err.Error())
		}
	}
	return s.Repository.DeleteById(ctx, id)
}
