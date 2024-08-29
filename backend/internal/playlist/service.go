package playlist

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

func (s *Service) Get(ctx context.Context, keyword string, opts *options.FindOptions) ([]*Playlist, error) {
	playlists, err := s.Repository.Get(ctx, keyword, opts)
	if err != nil {
		return nil, err
	}
	for _, pl := range playlists {
		if pl.ThumbnailPath != "" {
			pl.ThumbnailPath = fmt.Sprintf("thumbnails/%s", pl.ThumbnailPath)
		}

	}
	return playlists, nil
}

func (s *Service) GetById(ctx context.Context, id primitive.ObjectID) (*Playlist, error) {
	playlist, err := s.Repository.GetById(ctx, id)
	if err != nil || playlist == nil {
		return playlist, err
	}
	for _, track := range playlist.SongDetailList {
		if track.ThumbnailName != "" {
			track.ThumbnailName = fmt.Sprintf("thumbnails/%s", track.ThumbnailName)
		}
	}
	return playlist, nil
}

func (s *Service) UpdateOne(ctx context.Context, data *Playlist, thumbnail *utils.FileData) (*Playlist, error) {
	// get updated music track
	playlist, err := s.Repository.GetById(ctx, data.ID)
	if err != nil {
		return nil, err
	}

	if data.Thumbnail == "" && thumbnail.Header != nil {
		// Remove old file
		if err := os.Remove(filepath.Join(s.Config.FilePath.Thumbnail, playlist.ThumbnailPath)); err != nil {
			log.Printf("Delete song error %s", err.Error())
		}
		// Upload new file
		playlist.ThumbnailPath = utils.GenFileName(thumbnail.Header.Filename)
		err := utils.SaveFile(s.Config.FilePath.Thumbnail, playlist.ThumbnailPath, thumbnail.Data)
		if err != nil {
			return nil, err
		}
	}
	// Update old track
	playlist.Name = data.Name

	newPlaylist, err := s.Repository.UpdateOne(ctx, playlist)
	return newPlaylist, err
}

func (s *Service) AddTrack(ctx context.Context, payload *AddPlaylistPayload) error {
	// Remove musicId in all playlist
	err := s.Repository.RemoveMusicFromPlaylist(ctx, payload.MusicId)
	if err != nil {
		return err
	}
	for _, id := range payload.PlaylistIds {
		playlistId, err := primitive.ObjectIDFromHex(id)
		if err != nil {
			return err
		}
		err = s.Repository.UpsertMusicPlaylist(ctx, payload.MusicId, playlistId)
		if err != nil {
			return err
		}
	}
	return nil
}
func (s *Service) CreateOne(ctx context.Context, data *Playlist, thumbnail *utils.FileData) (*Playlist, error) {
	if thumbnail.Header != nil {
		data.ThumbnailPath = utils.GenFileName(thumbnail.Header.Filename)
		err := utils.SaveFile(s.Config.FilePath.Thumbnail, data.ThumbnailPath, thumbnail.Data)
		if err != nil {
			return nil, err
		}
	}
	res, err := s.Repository.Create(ctx, data)
	return res, err
}

func (s *Service) DeleteById(ctx context.Context, id primitive.ObjectID) error {
	pl, err := s.Repository.GetById(ctx, id)
	if err != nil {
		return err
	}
	if pl.ThumbnailPath != "" {
		// Delete thumbnail
		if err := os.Remove(filepath.Join(s.Config.FilePath.Thumbnail, pl.ThumbnailPath)); err != nil {
			log.Printf("Delete thumbnail error %s", err.Error())
		}
	}
	return s.Repository.DeleteById(ctx, id)
}
