package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"

	_ "github.com/lib/pq"

	"github.com/mes32/go-todo/server/database"
	"github.com/mes32/go-todo/server/types"
)

type TaskGroup = types.TaskGroup
type TaskGroupRequest = types.TaskGroupRequest
type GetTaskResponse = types.GetTaskResponse

func main() {
	// http.HandleFunc("/", rootRouter)
	http.HandleFunc("/api/tasks/", taskRouter)
	http.HandleFunc("/api/task-groups/", groupRouter)

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

func taskRouter(writer http.ResponseWriter, request *http.Request) {
	switch request.Method {
	case http.MethodGet:
		// date := request.URL.Query()["date"][0]
		tasks, err := database.AllTasks()
		if err != nil {
			log.Println(err)
			writer.WriteHeader(http.StatusInternalServerError)
			return
		}

		groups, err := database.AllGroups()
		if err != nil {
			log.Println(err)
			writer.WriteHeader(http.StatusInternalServerError)
			return
		}

		totalTasks := 0
		remainingTasks := 0
		for _, task := range tasks {
			for _, group := range groups {
				// if group.Tasks == nil {
					// group.Tasks = []*Task{}
				// }
				if task.GroupID == group.ID {
					group.Tasks = append(group.Tasks, task)
					break
				}
			}
			
			totalTasks++
			if !task.Complete {
				remainingTasks++
			}
		}

		response := GetTaskResponse{TaskGroups: groups, TotalTasks: totalTasks, RemainingTasks: remainingTasks}
		responseJson, err := json.Marshal(response)
		if err != nil {
			log.Println(err)
			writer.WriteHeader(http.StatusInternalServerError)
			return
		}
		writer.WriteHeader(http.StatusOK)
		writer.Write(responseJson)
	case http.MethodPost:
		writer.WriteHeader(http.StatusCreated)
		writer.Write([]byte("201 - Created"))
	case http.MethodPut:
		idString := request.URL.Query()["id"][0]
		id, err := strconv.Atoi(idString)
		if err != nil {
			log.Println(err)
			writer.WriteHeader(http.StatusInternalServerError)
			return
		}

		completeString := request.URL.Query()["complete"][0]
		complete, err := strconv.ParseBool(completeString)
		if err != nil {
			log.Println(err)
			writer.WriteHeader(http.StatusInternalServerError)
			return
		}

		err = database.UpdateTask(id, complete)
		if err != nil {
			log.Println(err)
			writer.WriteHeader(http.StatusInternalServerError)
			return
		}

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

func groupRouter(writer http.ResponseWriter, request *http.Request) {
	switch request.Method {
	case http.MethodPost:
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
	case http.MethodDelete:
		writer.WriteHeader(http.StatusOK)
		writer.Write([]byte("200 - OK"))
	default:
		writer.WriteHeader(http.StatusInternalServerError)
		writer.Write([]byte("500 - Internal Server Error"))
	}
}
