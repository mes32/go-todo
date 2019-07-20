package main

import (
	"log"
	"net/http"
	"os"
)

func taskRouter(writer http.ResponseWriter, request *http.Request) {
	switch request.Method {
	case http.MethodGet:
		writer.Write([]byte("GET /api/tasks"))
	case http.MethodPost:
		writer.WriteHeader(http.StatusCreated)
		writer.Write([]byte("201 - Created"))
	case http.MethodPut:
		writer.WriteHeader(http.StatusOK)
		writer.Write([]byte("200 - OK"))
	case http.MethodDelete:
		writer.WriteHeader(http.StatusOK)
		writer.Write([]byte("200 - OK"))
	default:
		writer.WriteHeader(http.StatusInternalServerError)
		writer.Write([]byte("500 - Internal Server Error"))
	}
}

func rootRouter(writer http.ResponseWriter, request *http.Request) {
	writer.WriteHeader(http.StatusNotFound)
	writer.Write([]byte("500 - Not Found"))
}

func main() {
	http.HandleFunc("/api/tasks", taskRouter)
	http.HandleFunc("/", rootRouter)

	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("$PORT must be set")
	}

	println("Starting server on port: " + port)
	if err := http.ListenAndServe(":" + port, nil); err != nil {
		panic(err)
	}
}
