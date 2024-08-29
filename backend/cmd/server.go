package cmd

import (
	"backend/config"
	"backend/internal/musictrack"
	"backend/internal/playlist"
	"backend/internal/server"
	"backend/internal/utils"
	"backend/pkg/database"
	"context"
	"github.com/gin-gonic/gin"
	"github.com/spf13/cobra"
	"go.mongodb.org/mongo-driver/mongo"
	"go.uber.org/dig"
	"log"
)

func provideCoreDependencies() *dig.Container {
	c := dig.New()

	err := c.Provide(gin.New)
	if err != nil {
		return nil
	}
	c.Provide(server.NewServer)
	c.Provide(server.NewCoreHTTPServer)

	c.Provide(InitMongoDB)
	c.Provide(database.NewMongoDB)
	_ = c.Provide(context.Background)
	c.Provide(func() *config.Config {
		return cfg
	})

	// Music track
	c.Provide(musictrack.NewHandler)
	c.Provide(musictrack.NewService)
	c.Provide(musictrack.NewRepository)

	// Playlist
	c.Provide(playlist.NewHandler)
	c.Provide(playlist.NewService)
	c.Provide(playlist.NewRepository)

	return c
}

func serverCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "server",
		Short: "",
		Long:  ``,
		RunE: func(cmd *cobra.Command, args []string) error {
			// Init dir contain file
			var err error
			err = utils.CreateDirs([]string{cfg.FilePath.Thumbnail, cfg.FilePath.MusicTrack})
			if err != nil {
				log.Panic(err)
			}
			ctx, cancelFn := context.WithCancel(context.Background())
			defer cancelFn()

			container := provideCoreDependencies()

			// Start server
			err = container.Invoke(func(c *server.CoreHTTPServer) {
				c.AddCoreRouter()
				err := c.Start()
				if err != nil {
					panic(err)
				}
			})
			if err != nil {
				return err
			}

			var client *mongo.Client
			err = container.Invoke(func(db *mongo.Database) {
				client = db.Client()
			})
			if err != nil {
				return err
			}

			defer func() {
				if err = client.Disconnect(ctx); err != nil {
					panic(err)
				}
			}()
			return nil
		},
	}
}
