package main

import (
	"log"
	"net/http"
	"os"

	"github.com/mes32/go-todo/server/routers"
)

func main() {
	// http.HandleFunc("/", rootRouter)
	http.HandleFunc("/api/task/", routers.TaskRouter)
	http.HandleFunc("/api/task-group/", routers.GroupRouter)

	buildHandler := http.FileServer(http.Dir("./client/build/"))
	http.Handle("/", buildHandler)

	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("$PORT must be set")
	}
	println("Starting server on port: " + port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Panic(err)
	}
}
