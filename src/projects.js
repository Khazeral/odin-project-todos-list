import { Task } from "./task";


export class Project {
    constructor(title, color, tasks) {
        this.id = Date.now();
        this.color = color
        this.title = title;
        this.tasks = tasks;
    }

    addTask(task) {
        if (!(task instanceof Task)) {
            throw new Error("Only Task instances can be added.");
        }
        this.tasks.push(task);
    }
    

    removeTask(task) {
        this.tasks = this.tasks.filter(t => t !== task);
    }

    getTasks() {
        return this.tasks;
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
        this.projects = this.projects.filter(p => p.id !== project.id);
    }

    getProjectByName(title) {
        return this.projects.find(p => p.title === title);
    }

    getAllProjects() {
        return this.projects;
    }
}
