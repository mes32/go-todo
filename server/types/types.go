package types

type Task struct {
	ID int
	GroupID int
	Group string
	Description string
	Complete bool
}

type TaskGroup struct {
	ID int
	Name string
	Tasks []*Task
}

type TaskGroupRequest struct {
	Name string `json:"name"`
}

type GetTaskResponse struct {
	TaskGroups []*TaskGroup
	TotalTasks int
	RemainingTasks int
}