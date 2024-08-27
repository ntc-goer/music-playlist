package main

import "backend/cmd"

func main() {
	if err := cmd.Execute(); err != nil {
		panic(err)
	}
}
