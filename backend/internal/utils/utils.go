package utils

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo/options"
	"io"
	"log"
	"mime/multipart"
	"os"
	"path/filepath"
	"strconv"
	"time"
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

func SaveFile(dirPath string, fileName string, data multipart.File) error {
	dst, err := os.Create(filepath.Join(dirPath, fileName))
	if err != nil {
		return err
	}
	defer dst.Close()

	// Copy the uploaded file to the destination file
	if _, err := io.Copy(dst, data); err != nil {
		return err
	}
	return nil
}

func CreateDirs(dirs []string) error {
	for _, dir := range dirs {
		if _, err := os.Open(dir); os.IsNotExist(err) {
			mkDirErr := os.MkdirAll(dir, 0755)
			if mkDirErr != nil {
				return err
			}
		} else if os.IsExist(err) {
			log.Printf("Dir %s exist", dir)
		} else if err != nil {
			log.Printf("Error %s", err.Error())
		}
	}
	return nil
}

func GenFileName(fName string) string {
	if fName == "" {
		return ""
	}
	ext := filepath.Ext(fName)
	return fmt.Sprintf("%s_%s%s", fName[:len(fName)-len(ext)], time.Now().String()[:3], ext)
}

func GetQueryValue(ctx *gin.Context, query string, defaultValue string) string {
	val := ctx.Query(query)
	if val == "" {
		return defaultValue
	}
	return val
}

func GetFindOptions(ctx *gin.Context) *options.FindOptions {
	pageStr := GetQueryValue(ctx, "page", "1")
	pageSizeStr := GetQueryValue(ctx, "pageSize", "10")

	page, _ := strconv.Atoi(pageStr)
	opts := options.Find()
	pageSize, _ := strconv.Atoi(pageSizeStr)
	if int64(pageSize) > 0 {
		opts.SetLimit(int64(pageSize)).SetSkip((int64(page) - 1) * int64(pageSize))
	}
	return opts
}
