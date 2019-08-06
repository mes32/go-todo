package main

import (
	"log"
	"net/http"
	"os"

	"github.com/mes32/go-todo/server/routers"
)

func main() {
	const BUILD_DIR = "./client/build/"

	clientRouter := http.FileServer(http.Dir(BUILD_DIR))
	http.Handle("/", clientRouter)
	http.HandleFunc("/api/task/", routers.TaskRouter)
	http.HandleFunc("/api/task-group/", routers.GroupRouter)

	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("$PORT must be set")
	}
	log.Println("Starting server on port: " + port)
	if err := http.ListenAndServe(":" + port, nil); err != nil {
		log.Panic(err)
	}
}
