package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"sort"

	_ "github.com/lib/pq"
)

type Env struct {
	db *sql.DB
}

type Task struct {
	ID int
	groupID int
	group string
	Description string
	Complete bool
}

type TaskGroup struct {
	ID int
	Name string
	Tasks []*Task
}

type GetTaskResponse struct {
	TaskGroups []*TaskGroup
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

		groupsMap := make(map[int]*TaskGroup)
		totalTasks := 0
		remainingTasks := 0
		for _, task := range tasks {
			if groupsMap[task.groupID] == nil {
				newGroup := TaskGroup{task.groupID, task.group, []*Task{task}}
				groupsMap[task.groupID] = &newGroup
			} else {
				groupsMap[task.groupID].Tasks = append(groupsMap[task.groupID].Tasks, task)
			}
			
			totalTasks++
			if !task.Complete {
				remainingTasks++
			}
		}

		groupsArray := []*TaskGroup{}
		for _, group := range groupsMap {
			groupsArray = append(groupsArray, group)
		}

		sort.Slice(groupsArray, func(i, j int) bool {
  			return groupsArray[i].ID < groupsArray[j].ID
		})

		response := GetTaskResponse{groupsArray, totalTasks, remainingTasks}
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
		ORDER BY group_id, task.id
	;
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	taskArray := make([]*Task, 0)
	for rows.Next() {
		task := new(Task)
		err := rows.Scan(&task.ID, &task.groupID, &task.group, &task.Description, &task.Complete)
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
