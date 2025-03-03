const container = document.querySelector("main")

export const createProject = (project) => {
    const node = document.createElement("div");
    node.className = "project-menu";

    const colorSquare = document.createElement("div");
    colorSquare.className = "color-square";
    colorSquare.style.backgroundColor = project.color;

    const projectTitle = document.createElement("p");
    projectTitle.className = "project-title";
    projectTitle.textContent = project.title;

    const taskCounter = document.createElement("p");
    taskCounter.className = "task-counter"; 
    taskCounter.textContent = project.tasks.length;

    node.append(colorSquare, projectTitle, taskCounter);
    return node;
};

export const createProjectWorkspace = (project) =>{

    container.innerHTML = ""; 

    const header = document.createElement("header");
    header.className = "header-project"

    const colorSquare = document.createElement("div");
    colorSquare.style.backgroundColor = project.color;

    const projectTitle = document.createElement("h1");
    projectTitle.textContent = project.title;

    const addProjectButton = document.createElement("button");
    addProjectButton.textContent = "Créer";

    header.append(colorSquare, projectTitle, addProjectButton);
    container.append(header);

    // Section d'ajout de tâches
    const taskInputContainer = document.createElement("div");
    taskInputContainer.className = "task-input-container"

    const taskInput = document.createElement("input");

    const addTaskButton = document.createElement("button");
    addTaskButton.textContent = "Ajouter";
    addTaskButton.style.backgroundColor = "#8ec4ff";

    taskInputContainer.append(taskInput, addTaskButton);
    container.append(taskInputContainer);

    // Container des tâches
    const tasksContainer = document.createElement("div");
    tasksContainer.id = "tasks-container";

    container.append(tasksContainer);

    addTaskButton.addEventListener("click", () => {
        if (taskInput.value.trim() !== "") {
            createTask(taskInput.value, tasksContainer);
            taskInput.value = ""; 
        }
    });
}

function createTask(title, container) {
    const task = document.createElement("div");
    task.className = "task"

    const taskTitle = document.createElement("p");
    taskTitle.textContent = title;

    const taskStatus = document.createElement("span");
    taskStatus.textContent = "✔️";

    taskStatus.addEventListener("click", () => {
        if (taskStatus.textContent === "✔️") {
            taskStatus.textContent = "❌";
        } else {
            taskStatus.textContent = "✔️";
        }
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.style.backgroundColor = "#ff4d4d";

    deleteButton.addEventListener("click", () => {
        container.removeChild(task);
    });

    task.append(taskStatus, taskTitle, deleteButton);
    container.appendChild(task);
}

