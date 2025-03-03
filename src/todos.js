export class Todo {
    constructor(title, description, dueDate, priority, project = null,state = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.completed = state
    }
}
