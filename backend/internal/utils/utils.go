package utils

import (
	"github.com/gin-gonic/gin"
	"mime/multipart"
)

type FileData struct {
	Header *multipart.FileHeader
	Data   multipart.File
}

func FormFile(ctx *gin.Context, formName string) (*FileData, error) {
	file, header, err := ctx.Request.FormFile(formName)
	if err != nil {
		return &FileData{
			Header: nil,
			Data:   nil,
		}, err
	}
	fileData := &FileData{
		Header: header,
		Data:   file,
	}
	return fileData, nil
}
