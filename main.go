package main

import (
	"log"
	"net/http"
	"os"
	"database/sql"

	_ "github.com/lib/pq"
)

type Env struct {
    db *sql.DB
}

type Task struct {
    id string
    description string
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

	_, err = db.Exec("CREATE TABLE IF NOT EXISTS tasks (id SERIAL PRIMARY KEY, task_description VARCHAR(200) NOT NULL)")
	if err != nil {
		log.Panic(err)
	}
	_, err = db.Exec("INSERT INTO tasks (task_description) VALUES ('test')")
	if err != nil {
		log.Panic(err)
	}

	
	//; err != nil {
	// 	log.Fatal(err)
	// 	return
	// }
	
	println(db)
	env := &Env{db: db}

	http.HandleFunc("/api/tasks", env.taskRouter)
	http.HandleFunc("/", rootRouter)

	println("Starting server on port: " + port)
	if err := http.ListenAndServe(":" + port, nil); err != nil {
		panic(err)
	}
}

func rootRouter(writer http.ResponseWriter, request *http.Request) {
	writer.WriteHeader(http.StatusNotFound)
	writer.Write([]byte("500 - Not Found"))
}

func (env *Env)taskRouter(writer http.ResponseWriter, request *http.Request) {
	switch request.Method {
	case http.MethodGet:
		println(env.db)
		tasks, err := AllTasks(env.db)
		if err != nil {
			panic(err)
			// println("Err is not nil in taskRouter")
			// return
		}
		for i := 0; i < len(tasks); i++ {
			println(i)
		}
		println(tasks)
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

func AllTasks(db *sql.DB) ([]*Task, error) {
    rows, err := db.Query("SELECT * FROM tasks")
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    taskArray := make([]*Task, 0)
    for rows.Next() {
        task := new(Task)
        err := rows.Scan(&task.id, &task.description)
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
