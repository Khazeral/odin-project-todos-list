const container = document.querySelector("main");


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

export const createProjectWorkspace = (project) => {
    container.innerHTML = ""; 

    const header = document.createElement("header");
    header.id = "header-project";

    const colorSquare = document.createElement("div");
    colorSquare.style.backgroundColor = project.color;

    const projectTitle = document.createElement("h1");
    projectTitle.textContent = project.title;

    const addProjectButton = document.createElement("button");
    addProjectButton.innerHTML = '<span class="mdi mdi-plus"></span> New project';

    const editProjectButton = document.createElement("button");
    editProjectButton.innerHTML = '<span class="mdi mdi-plus"></span> Edit project';

    header.append(colorSquare, projectTitle, addProjectButton, editProjectButton);
    container.append(header);

    const taskInputContainer = document.createElement("div");
    taskInputContainer.className = "task-input-container";

    const taskInput = document.createElement("input");
    taskInput.placeholder = "Ajouter une tâche...";

    const addTaskButton = document.createElement("button");
    addTaskButton.innerHTML = '<span class="mdi mdi-plus"></span> Add';
    addTaskButton.style.backgroundColor = "#8ec4ff";

    taskInputContainer.append(taskInput, addTaskButton);
    container.append(taskInputContainer);

    const tasksSection = document.createElement("div");
    tasksSection.className = "tasks-section";

    const tasksToCompleteContainer = document.createElement("div");
    tasksToCompleteContainer.className = "task-list";

    const toCompleteTitle = document.createElement("h2");
    tasksToCompleteContainer.appendChild(toCompleteTitle);

    const completedTasksContainer = document.createElement("div");
    completedTasksContainer.className = "task-list";

    const completedTitle = document.createElement("h2");
    completedTasksContainer.appendChild(completedTitle);

    tasksSection.append(tasksToCompleteContainer, completedTasksContainer);
    container.append(tasksSection);

    function updateTaskCounters() {
        const toCompleteCount = tasksToCompleteContainer.querySelectorAll(".task").length;
        const completedCount = completedTasksContainer.querySelectorAll(".task").length;
        toCompleteTitle.textContent = `A compléter (${toCompleteCount})`;
        completedTitle.textContent = `Terminées (${completedCount})`;
    }

    project.tasks.forEach((task) => {
        createTask(task.title, task.completed, tasksToCompleteContainer, completedTasksContainer, updateTaskCounters);
    });

    updateTaskCounters();

    addTaskButton.addEventListener("click", () => {
        if (taskInput.value.trim() !== "") {
            createTask(taskInput.value, false, tasksToCompleteContainer, completedTasksContainer, updateTaskCounters);
            taskInput.value = ""; 
            updateTaskCounters();
        }
    });
};

function createTask(title, isCompleted, toCompleteContainer, completedContainer, updateCounters) {
    const task = document.createElement("div");
    task.className = "task";

    if (isCompleted) {
        task.classList.add("completed");
    }

    const taskTitle = document.createElement("p");
    taskTitle.textContent = title;

    const taskStatus = document.createElement("button");
    taskStatus.className = "task-status";
    updateStatusButton(taskStatus, isCompleted);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<span class="mdi mdi-trash-can-outline"></span>';
    deleteButton.className = "delete-button";

    taskStatus.addEventListener("click", () => {
        const currentlyCompleted = task.classList.contains("completed");
        task.classList.toggle("completed");

        updateStatusButton(taskStatus, !currentlyCompleted);

        if (task.classList.contains("completed")) {
            completedContainer.appendChild(task);
        } else {
            toCompleteContainer.appendChild(task);
        }

        updateCounters();
    });

    deleteButton.addEventListener("click", () => {
        task.remove();
        updateCounters();
    });

    task.append(taskStatus, taskTitle, deleteButton);

    if (isCompleted) {
        completedContainer.appendChild(task);
    } else {
        toCompleteContainer.appendChild(task);
    }

    updateCounters();
}

function updateStatusButton(button, isCompleted) {
    if (isCompleted) {
        button.innerHTML = '<span class="mdi mdi-check"></span>';
        button.style.backgroundColor = "#47df84"
    } else {
        button.innerHTML = '<span class="mdi mdi-clock-outline"></span>';
        button.style.backgroundColor = "transparent"
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("toggle-button");
    const sidebar = document.querySelector("aside");

    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
        console.log("Classes actuelles :", sidebar.classList);
    });
});
