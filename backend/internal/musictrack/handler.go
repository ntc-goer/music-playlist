package musictrack

import (
	"backend/internal/utils"
	"github.com/gin-gonic/gin"
	"net/http"
)

type Handler struct {
	Service *Service
}

func NewHandler() *Handler {
	return &Handler{}
}

func (h *Handler) Create(ctx *gin.Context) {
	var payload MusicTrack
	if err := ctx.ShouldBind(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	songFileData, err := utils.FormFile(ctx, "file")
	thumbnail, err := utils.FormFile(ctx, "thumbnail")
}
