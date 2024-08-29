package database

import (
	"backend/config"
	"fmt"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/net/context"
	"os"
	"time"
)

const (
	connectionStringTemplate    = "mongodb://%s:%s@%s/%s"
	connectionStringSrvTemplate = "mongodb+srv://%s:%s@%s/%s"
)

type MongoDB struct {
	ConnectTimeout int      `json:"connect_timeout"`
	Username       string   `json:"username"`
	Password       string   `json:"password"`
	Hosts          []string `json:"hosts"`
	Port           string   `json:"port"`
	Options        string   `json:"options"`
	Database       string   `json:"database"`
}

func NewMongoDB(c *config.Config) *MongoDB {
	return &MongoDB{
		Username: c.Database.UserName,
		Password: c.Database.Password,
		Hosts:    []string{c.Database.Host},
		Database: c.Database.DBName,
		Port:     c.Database.Port,
	}
}

func (m *MongoDB) Connect() (*mongo.Client, error) {
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)

	connectionStr := connectionStringTemplate
	host := m.Hosts[0] // use db host configurated in config file
	if dbHost := os.Getenv("DB_HOST"); dbHost != "" {
		host = dbHost
	}

	port := m.Port // use db port configurated in config file
	if dbPort := os.Getenv("DB_PORT"); dbPort != "" {
		port = dbPort
	}

	uri := fmt.Sprintf(connectionStr, m.Username, m.Password, fmt.Sprintf("%s:%s", host, port), m.Database)
	opts := options.Client().ApplyURI(uri).SetServerAPIOptions(serverAPI)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, opts)
	client.Database(m.Database)
	return client, err
}
