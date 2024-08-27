package cmd

import (
	"backend/config"
	"github.com/spf13/cobra"
)

var cfg *config.Config

func Execute() error {
	var err error
	// Get configs file
	cfg, err = config.Load()
	rootCmd := &cobra.Command{
		Use: "music track management",
	}
	rootCmd.AddCommand(serverCmd())
	err = rootCmd.Execute()
	if err != nil {
		return err
	}
	return nil
}
