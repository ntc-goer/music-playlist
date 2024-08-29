package server

import (
	"backend/config"
	"backend/internal/musictrack"
	"backend/internal/playlist"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

type CoreHTTPServer struct {
	*Server
	Config     *config.Config
	MusicTrack *musictrack.Handler
	Playlist   *playlist.Handler
}

func NewCoreHTTPServer(httpServer *Server, mth *musictrack.Handler, pl *playlist.Handler, cfg *config.Config) *CoreHTTPServer {
	return &CoreHTTPServer{
		Server:     httpServer,
		MusicTrack: mth,
		Config:     cfg,
		Playlist:   pl,
	}
}

func (c *CoreHTTPServer) AddCoreRouter() {
	c.Engine.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "DELETE", "PUT"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           15 * time.Second,
	}))

	v1 := c.Engine.Group(c.Config.ApiPrefix)

	v1.Static("/thumbnails", c.Config.FilePath.Thumbnail)
	v1.Static("/songs", c.Config.FilePath.MusicTrack)

	v1.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	v1.GET("/music", c.MusicTrack.Get)
	v1.GET("/music/:id", c.MusicTrack.GetById)
	v1.PUT("/music", c.MusicTrack.Update)
	v1.POST("/music", c.MusicTrack.Create)
	v1.DELETE("/music/:id", c.MusicTrack.Delete)

	v1.GET("/playlist", c.Playlist.Get)
	v1.GET("/playlist/:id", c.Playlist.GetById)
	v1.PUT("/playlist", c.Playlist.Update)
	v1.POST("/playlist", c.Playlist.Create)
	v1.POST("/playlist/add", c.Playlist.AddTrack)
	v1.DELETE("/playlist/:id", c.Playlist.Delete)
}
