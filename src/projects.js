import { Task } from "./task";

export class Project {
    constructor(title, color, tasks = []) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.color = color;
        this.tasks = tasks.map(t => new Task(t.title, t.completed));
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

    saveTasks(projectManager) {
        projectManager.saveProjectsToLocalStorage();
    }
}

export class ProjectManager {
    constructor() {
        this.projects = this.loadProjectsFromLocalStorage();
    }

    loadProjectsFromLocalStorage() {
        const data = JSON.parse(localStorage.getItem("projects")) || [];
    
        return data.map(projectData => new Project(
            projectData.title, 
            projectData.color, 
            projectData.tasks.map(taskData => new Task(taskData.title, taskData.completed))
        ));
    }

    saveProjectsToLocalStorage() {
        const projectsData = this.projects.map(project => ({
            id: project.id,
            title: project.title,
            color: project.color,
            tasks: project.tasks.map(taskData => new Task(taskData.title, taskData.completed)),
        }))
        localStorage.setItem("projects", JSON.stringify(projectsData));
    }

    addProject(project) {
        if (!(project instanceof Project)) {
            throw new Error("Only Project instances can be added.");
        }
        this.projects.push(project);
        this.saveProjectsToLocalStorage();
    }

    removeProject(project) {
        this.projects = this.projects.filter(p => p.id !== project.id);
        this.saveProjectsToLocalStorage();
    }

    getAllProjects() {
        return this.projects;
    }
}
