package server

import (
	"backend/config"
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

type Server struct {
	Engine *gin.Engine
	Server *http.Server
}

func NewServer(engine *gin.Engine, cfg *config.Config) *Server {
	server := &http.Server{Addr: fmt.Sprintf(":%s", cfg.ServerPort), Handler: engine}
	return &Server{
		Engine: engine,
		Server: server,
	}
}

func (h *Server) Start() error {
	if err := h.Server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
		return err
	}
	return nil
}
