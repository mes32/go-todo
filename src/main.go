package main

import (
	"database/sql"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"

	_ "github.com/lib/pq"

	api "github.com/mes32/go-todo/pkg/api"
)

type Env struct {
	db *sql.DB
}

// type Task struct {
// 	ID int
// 	groupID int
// 	group string
// 	Description string
// 	Complete bool
// }

type TaskGroup struct {
	ID int
	Name string
	Tasks []*api.Task
}

type TaskGroupRequest struct {
	Name string `json:"name"`
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

	// http.HandleFunc("/", rootRouter)
	http.HandleFunc("/api/tasks/", env.taskRouter)
	http.HandleFunc("/api/task-groups/", env.groupRouter)

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

		groups, err := AllGroups(env.db)
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

		response := GetTaskResponse{groups, totalTasks, remainingTasks}
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

		err = UpdateTask(env.db, id, complete)
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

func (env *Env) groupRouter(writer http.ResponseWriter, request *http.Request) {
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

		err = CreateGroup(env.db, taskGroup.Name)
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

func AllTasks(db *sql.DB) ([]*api.Task, error) {
	rows, err := db.Query(`
	SELECT
		task.id AS id
		, task_group.id AS group_id
		, group_name AS group
		, task_description AS description
		, complete
	FROM task_group
	JOIN task ON task.group_id = task_group.id
		ORDER BY group_id, task.id
	;
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	taskArray := make([]*api.Task, 0)
	for rows.Next() {
		task := new(api.Task)
		err := rows.Scan(&task.ID, &task.GroupID, &task.Group, &task.Description, &task.Complete)
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

func AllGroups(db *sql.DB) ([]*TaskGroup, error) {
	rows, err := db.Query(`
	SELECT
		id
		, group_name
	FROM task_group
		ORDER BY id
	;
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	groupArray := make([]*TaskGroup, 0)
	for rows.Next() {
		group := new(TaskGroup)
		group.Tasks = []*api.Task{}
		err := rows.Scan(&group.ID, &group.Name)
		if err != nil {
			return nil, err
		}
		groupArray = append(groupArray, group)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return groupArray, nil
}

func UpdateTask(db *sql.DB, id int, complete bool) (error) {
	_, err := db.Exec(`
	UPDATE task SET complete = $2 WHERE id = $1;
	`, id, complete)
	if err != nil {
		return err
	}
	return nil
}

func CreateGroup(db *sql.DB, name string) (error) {
	_, err := db.Exec(`
	INSERT INTO task_group (group_name) VALUES ($1);
	`, name)
	return err
}
