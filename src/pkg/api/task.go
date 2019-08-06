package api

type Task struct {
	ID int
	groupID int
	group string
	Description string
	Complete bool
}