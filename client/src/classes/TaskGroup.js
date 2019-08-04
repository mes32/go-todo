import Task from './Task';

class TaskGroup {
    constructor(id, name, tasks) {
        this.id = id;
        this.name = name;
        this.tasks = tasks;
    }

    static fromRequest(requestArray) {
        const outputArray = [];
        if (!requestArray) {
            return outputArray;
        }
        
        for (let element of requestArray) {
            const id = element.ID;
            const name = element.Name;
            const tasks = Task.fromRequest(element.Tasks);
            outputArray.push(new TaskGroup(id, name, tasks));
        }
        return outputArray;
    }
}

export default TaskGroup;