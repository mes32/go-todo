package database

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/lib/pq"

	"github.com/mes32/go-todo/server/types"
)

var db *sql.DB
var err error

type Task = types.Task
type TaskGroup = types.TaskGroup

func init() {
	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		databaseURL = "dbname=go_todo sslmode=disable"
	}

	db, err = sql.Open("postgres", databaseURL)
	if err != nil {
		log.Panic(err)
	}

	if err = db.Ping(); err != nil {
		log.Panic(err)
	}
}

func AllTasks() ([]*Task, error) {
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

	taskArray := make([]*Task, 0)
	for rows.Next() {
		task := new(Task)
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

func AllGroups() ([]*TaskGroup, error) {
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
		group.Tasks = []*Task{}
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

func UpdateTask(id int, complete bool) (error) {
	_, err := db.Exec(`
	UPDATE task SET complete = $2 WHERE id = $1;
	`, id, complete)
	if err != nil {
		return err
	}
	return nil
}

func CreateGroup(name string) (error) {
	_, err = db.Exec(`
	INSERT INTO task_group (group_name) VALUES ($1);
	`, name)
	return err
}