import { Task } from "./task";

export class Project {
    constructor(title, color, tasks = []) {
        this.id = this.id = crypto.randomUUID();
        this.title = title;
        this.color = color;
        this.tasks = tasks.map(t => new Task(t.title, t.completed));
    }

    addTask(task, projectManager) {
        if (!(task instanceof Task)) {
            throw new Error("Only Task instances can be added.");
        }
        this.tasks.push(task);
        projectManager?.saveProjectsToLocalStorage();
    }

    removeTask(task, projectManager) {
        this.tasks = this.tasks.filter(t => t !== task);
        projectManager?.saveProjectsToLocalStorage(); 
    }

    getTasks() {
        return this.tasks;
    }
}

export class ProjectManager {
    constructor() {
        this.projects = this.loadProjectsFromLocalStorage();
    }

    loadProjectsFromLocalStorage() {
        const data = JSON.parse(localStorage.getItem("projects")) || [];
    
        this.projects = data.map(projectData => {
            const project = new Project(projectData.title, projectData.color, 
                projectData.tasks.map(taskData => new Task(taskData.title, taskData.completed))
            );
    
            return project;
        });

        console.log("ALLLLLLLLLERRRRR : ", this.projects)

        return this.projects

    }
    

    saveProjectsToLocalStorage() {
        const projects = this.getAllProjects().map(project => {
            return {
                ...project,
                tasks: project.tasks.map(task => ({
                    ...task,
                    project: undefined,
                }))
            };
        });
    
        localStorage.setItem("projects", JSON.stringify(projects));
    }
    

    addProject(project) {
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
