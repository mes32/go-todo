package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"

	_ "github.com/lib/pq"
)

type Env struct {
	db *sql.DB
}

type Task struct {
	ID int
	groupID int
	Group string
	Description string
	Complete bool
}

type GetTaskResponse struct {
	Tasks map[int][]*Task
	TotalTasks int
	RemainingTasks int
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("$PORT must be set")
	}

	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		databaseURL = "dbname=go_todo sslmode=disable"
	}

	db, err := sql.Open("postgres", databaseURL)
	if err != nil {
		log.Panic(err)
	}
	if err = db.Ping(); err != nil {
		log.Panic(err)
	}
	env := &Env{db: db}

	http.HandleFunc("/api/tasks/", env.taskRouter)
	// http.HandleFunc("/", rootRouter)

	buildHandler := http.FileServer(http.Dir("./client/build/"))
	http.Handle("/", buildHandler)

	println("Starting server on port: " + port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Panic(err)
	}
}

func (env *Env) taskRouter(writer http.ResponseWriter, request *http.Request) {
	switch request.Method {
	case http.MethodGet:
		// date := request.URL.Query()["date"][0]
		tasks, err := AllTasks(env.db)
		if err != nil {
			log.Println(err)
			writer.WriteHeader(http.StatusInternalServerError)
			return
		}

		groupsMap := make(map[int][]*Task)
		totalTasks := 0
		remainingTasks := 0
		for _, task := range tasks {
			totalTasks++
			if !task.Complete {
				remainingTasks++
			}
			groupsMap[task.groupID] = append(groupsMap[task.groupID], task)
		}

		response := GetTaskResponse{groupsMap, totalTasks, remainingTasks}
		responseJson, err := json.Marshal(response)
		if err != nil {
			log.Println(err)
			writer.WriteHeader(http.StatusInternalServerError)
			return
		}
		writer.Write(responseJson)
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

func AllTasks(db *sql.DB) ([]*Task, error) {
	rows, err := db.Query(`
	SELECT
		task.id AS id
		, group_id
		, group_name AS group
		, task_description AS description
		, complete
	FROM task
	JOIN task_group ON task_group.id = task.group_id
	;
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	taskArray := make([]*Task, 0)
	for rows.Next() {
		task := new(Task)
		err := rows.Scan(&task.ID, &task.groupID, &task.Group, &task.Description, &task.Complete)
		if err != nil {
			return nil, err
		}
		taskArray = append(taskArray, task)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return taskArray, nil
}
