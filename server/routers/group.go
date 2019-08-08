package routers

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/mes32/go-todo/server/database"
	"github.com/mes32/go-todo/server/types"
)

type TaskGroupRequest = types.TaskGroupRequest

func GroupRouter(writer http.ResponseWriter, request *http.Request) {
	switch request.Method {
	case http.MethodPost:
		createGroup(writer, request)
	case http.MethodDelete:
		deleteGroup(writer)
	default:
		defaultError(writer)
	}
}

func createGroup(writer http.ResponseWriter, request *http.Request) {
	bytes, err := ioutil.ReadAll(request.Body)
	defer request.Body.Close()
	if err != nil {
		log.Println(err)
		http.Error(writer, err.Error(), http.StatusInternalServerError)
		return
	}

	var taskGroup TaskGroupRequest
	err = json.Unmarshal(bytes, &taskGroup)
	if err != nil {
		log.Println(err)
		http.Error(writer, err.Error(), http.StatusInternalServerError)
		return
	}

	err = database.CreateGroup(taskGroup.Name)
	if err != nil {
		log.Println(err)
		http.Error(writer, err.Error(), http.StatusInternalServerError)
		return
	}

	writer.WriteHeader(http.StatusCreated)
	writer.Write([]byte("201 - Created"))
}

func deleteGroup(writer http.ResponseWriter) {
	writer.WriteHeader(http.StatusOK)
	writer.Write([]byte("200 - OK"))
}

func defaultError(writer http.ResponseWriter) {
	writer.WriteHeader(http.StatusInternalServerError)
	writer.Write([]byte("500 - Internal Server Error"))
}
