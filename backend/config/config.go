package config

import (
	"fmt"
	"github.com/mitchellh/mapstructure"
	"github.com/spf13/viper"
)

type Database struct {
	Host     string `json:"host"`
	Port     string `json:"port"`
	UserName string `json:"userName"`
	Password string `json:"password"`
	DBName   string `json:"db_name"`
}
type Config struct {
	Database   Database `json:"database"`
	ServerPort string   `json:"server_port"`
	ApiPrefix  string   `json:"api_prefix"`
}

func Load() (*Config, error) {
	var cfg Config
	viper.SetConfigName("development")
	viper.SetConfigType("yaml")
	viper.AddConfigPath("./config")
	err := viper.ReadInConfig() // Find and read the configs file
	if err != nil {             // Handle errors reading the configs file
		panic(fmt.Errorf("fatal error configs file: %w", err))
	}

	if err := viper.Unmarshal(&cfg, func(decoder *mapstructure.DecoderConfig) {
		decoder.TagName = "json"
	}); err != nil {
		return nil, err
	}
	return &cfg, nil
}
