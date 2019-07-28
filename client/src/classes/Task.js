class Task {
    constructor(id, description, complete) {
        this.id = id;
        this.description = description;
        this.complete = complete;
    }

    fromRequest(requestArray) {
        const outputArray = [];
        for (let element of requestArray) {
            const id = element.ID;
            const description = element.Description;
            const complete = element.Complete;
            outputArray.push(new Task(id, description, complete));
        }
        return outputArray;
    }
}

export default Task;