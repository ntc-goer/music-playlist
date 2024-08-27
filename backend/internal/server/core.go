package server

import (
	"backend/internal/musictrack"
	"github.com/gin-gonic/gin"
	"net/http"
)

type CoreHTTPServer struct {
	*Server
	MusicTrack *musictrack.Handler
}

func NewCoreHTTPServer(httpServer *Server, mth *musictrack.Handler) *CoreHTTPServer {
	return &CoreHTTPServer{
		Server:     httpServer,
		MusicTrack: mth,
	}
}

func (c *CoreHTTPServer) AddCoreRouter() {
	v1 := c.Engine.Group("/v1")

	v1.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	v1.POST("/music", c.MusicTrack.Create)
}
