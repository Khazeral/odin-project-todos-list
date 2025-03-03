export class Project {
    static id = 0;
    constructor(name) {
        this.id = id
        this.name = name;
        this.todos = [];
    }

    addTodo(todo) {
        if (!(todo instanceof Todo)) {
            throw new Error("Only Todo instances can be added.");
        }
        this.todos.push(todo);
    }

    removeTodo(todo) {
        this.todos = this.todos.filter(t => t !== todo);
    }

    getTodos() {
        return this.todos;
    }
}

export class ProjectManager {
    constructor() {
        this.projects = [];
    }

    addProject(project) {
        if (!(project instanceof Project)) {
            throw new Error("Only Project instances can be added.");
        }
        this.projects.push(project);
    }

    removeProject(project) {
        this.projects = this.projects.filter(p => p !== project);
    }

    getProjectByName(name) {
        return this.projects.find(p => p.name === name);
    }

    getAllProjects() {
        return this.projects;
    }
}
