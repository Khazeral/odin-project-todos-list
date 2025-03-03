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
    addProjectButton.innerHTML = '<span class="mdi mdi-plus"></span> Nouveau projet';

    header.append(colorSquare, projectTitle, addProjectButton);
    container.append(header);

    const taskInputContainer = document.createElement("div");
    taskInputContainer.className = "task-input-container";

    const taskInput = document.createElement("input");
    taskInput.placeholder = "Ajouter une tâche...";

    const addTaskButton = document.createElement("button");
    addTaskButton.textContent = "Ajouter";
    addTaskButton.style.backgroundColor = "#8ec4ff";

    taskInputContainer.append(taskInput, addTaskButton);
    container.append(taskInputContainer);

    const tasksSection = document.createElement("div");
    tasksSection.className = "tasks-section";

    const tasksToCompleteContainer = document.createElement("div");
    tasksToCompleteContainer.className = "task-list";
    tasksToCompleteContainer.innerHTML = `<h2>A compléter (${project.tasks.filter((e) => e.completed === false).length}) </h2>`;

    const completedTasksContainer = document.createElement("div");
    completedTasksContainer.className = "task-list";
    completedTasksContainer.innerHTML = `<h2>Terminées (${project.tasks.filter((e) => e.completed === true).length}) </h2>`;

    tasksSection.append(tasksToCompleteContainer, completedTasksContainer);
    container.append(tasksSection);

    project.tasks.forEach((task) => {
        createTask(task.title, task.completed, tasksToCompleteContainer, completedTasksContainer);
    });

    addTaskButton.addEventListener("click", () => {
        if (taskInput.value.trim() !== "") {
            createTask(taskInput.value, false, tasksToCompleteContainer, completedTasksContainer);
            taskInput.value = ""; 
        }
    });
};

function createTask(title, isCompleted, toCompleteContainer, completedContainer) {
    const task = document.createElement("div");
    task.className = "task";
    if (isCompleted) {
        task.classList.add("completed");
    }

    const taskTitle = document.createElement("p");
    taskTitle.textContent = title;

    const taskStatus = document.createElement("button");
    taskStatus.className = "task-status";
    taskStatus.textContent = isCompleted ? "🔄" : "✔️";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑️";
    deleteButton.className = "delete-button";

    taskStatus.addEventListener("click", () => {
        task.classList.toggle("completed");
        if (taskStatus.textContent === "✔️") {
            taskStatus.textContent = "🔄";
            completedContainer.appendChild(task);
        } else {
            taskStatus.textContent = "✔️";
            toCompleteContainer.appendChild(task);
        }
    });

    deleteButton.addEventListener("click", () => {
        task.remove();
    });

    task.append(taskStatus, taskTitle, deleteButton);

    if (isCompleted) {
        completedContainer.appendChild(task);
    } else {
        toCompleteContainer.appendChild(task);
    }
}
