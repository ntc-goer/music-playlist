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

func (s *Service) AddTrack(ctx context.Context, payload *AddPlaylistPayload) error {
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
	data.ThumbnailPath = utils.GenFileName(thumbnail.Header.Filename)
	err := utils.SaveFile("data/thumbnails", data.ThumbnailPath, thumbnail.Data)
	if err != nil {
		return nil, err
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
		if err := os.Remove(filepath.Join("data/thumbnails", pl.ThumbnailPath)); err != nil {
			log.Printf("Delete thumbnail error %s", err.Error())
		}
	}
	return s.Repository.DeleteById(ctx, id)
}
