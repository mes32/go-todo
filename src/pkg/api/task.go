package api

type Task struct {
	ID int
	GroupID int
	Group string
	Description string
	Complete bool
}