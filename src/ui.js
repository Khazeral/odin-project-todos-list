import { Task } from "./task";
import { generateProjectsTab } from ".";

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


export const createProjectWorkspace = (project, projectManager) => {
    container.innerHTML = ""; 

    const header = document.createElement("header");
    header.id = "header-project";

    const colorSquare = document.createElement("div");
    colorSquare.style.backgroundColor = project.color;

    const projectTitle = document.createElement("h1");
    projectTitle.textContent = project.title;

    const deleteProjectButton = document.createElement("button");
    deleteProjectButton.innerHTML = 'Delete project';
    deleteProjectButton.style.backgroundColor = "red"

    deleteProjectButton.addEventListener("click", () => {
        projectManager.removeProject(project); 
        container.innerHTML = ""; 
        generateProjectsTab()
    });

    header.append(colorSquare, projectTitle , deleteProjectButton);
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

    console.log("c'est les tasks !!! : ", project.tasks)
    project.tasks.forEach((task) => {
        createTask(project,task, tasksToCompleteContainer, completedTasksContainer, updateTaskCounters);
    });

    updateTaskCounters();

    addTaskButton.addEventListener("click", () => {
        if (taskInput.value.trim() !== "") {
            const newTask = new Task(taskInput.value, project, false);
    
            project.addTask(newTask);
    
            createTask(project, newTask, tasksToCompleteContainer, completedTasksContainer, updateTaskCounters);
    
            taskInput.value = ""; 
            projectManager.saveProjectsToLocalStorage()
            updateTaskCounters();
        }
    });
    
    
};

const createTask = (project, taskObj, toCompleteContainer, completedContainer, updateCounters) => {
    const task = document.createElement("div");
    task.className = "task";

    if (taskObj.completed) {
        task.classList.add("completed");
    }

    const taskTitle = document.createElement("p");
    taskTitle.textContent = taskObj.title;

    const taskStatus = document.createElement("button");
    taskStatus.className = "task-status";
    updateStatusButton(taskStatus, taskObj.completed);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<span class="mdi mdi-trash-can-outline"></span>';
    deleteButton.className = "delete-button";

    taskStatus.addEventListener("click", () => {
        taskObj.completed = !taskObj.completed;
        task.classList.toggle("completed");

        updateStatusButton(taskStatus, taskObj.completed);

        if (taskObj.completed) {
            completedContainer.appendChild(task);
        } else {
            toCompleteContainer.appendChild(task);
        }

        updateCounters();
    });

    deleteButton.addEventListener("click", () => {
        project.removeTask(taskObj); 
        task.remove(); 
        updateCounters();
    });

    task.append(taskStatus, taskTitle, deleteButton);

    if (taskObj.completed) {
        completedContainer.appendChild(task);
    } else {
        toCompleteContainer.appendChild(task);
    }

    updateCounters();
};


const updateStatusButton = (button, isCompleted) =>{
    if (isCompleted) {
        button.innerHTML = '<span class="mdi mdi-check"></span>';
        button.style.backgroundColor = "#47df84"
    } else {
        button.innerHTML = '<span class="mdi mdi-clock-outline"></span>';
        button.style.backgroundColor = "transparent"
    }
}

export const createProjectModal = () => {
    const modal = document.createElement("dialog");
    modal.classList.add("modal-container");

    const closeModal = () => {
        modal.close();
        modal.remove();
    };

    const header = document.createElement("div");
    header.classList.add("modal-header");

    const title = document.createElement("h2");
    title.textContent = "Créer un projet";

    const closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    closeButton.innerHTML = "×";
    closeButton.addEventListener("click", closeModal);

    header.appendChild(title);
    header.appendChild(closeButton);

    const content = document.createElement("div");
    content.classList.add("modal-content");

    const nameField = document.createElement("div");
    nameField.classList.add("modal-field");

    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Nom du projet :";
    nameLabel.setAttribute("for", "project-name");

    const nameInput = document.createElement("input");
    nameInput.id = "project-name";
    nameInput.type = "text";
    nameInput.placeholder = "Nom du projet";
    nameInput.required = true;
    nameInput.classList.add("modal-input");

    nameField.appendChild(nameLabel);
    nameField.appendChild(nameInput);

    const colorField = document.createElement("div");
    colorField.classList.add("modal-field");

    const colorLabel = document.createElement("label");
    colorLabel.textContent = "Couleur :";
    colorLabel.setAttribute("for", "project-color");

    const colorSelect = document.createElement("select");
    colorSelect.id = "project-color";
    colorSelect.classList.add("modal-select");

    const colors = [
        { name: "Rouge", value: "#FF0000" },
        { name: "Vert", value: "#00FF00" },
        { name: "Bleu", value: "#0000FF" },
        { name: "Jaune", value: "#FFFF00" },
        { name: "Orange", value: "#FFA500" },
        { name: "Violet", value: "#800080" },
        { name: "Rose", value: "#FFC0CB" },
        { name: "Noir", value: "#000000" },
        { name: "Blanc", value: "#FFFFFF" }
    ];

    colors.forEach(color => {
        const option = document.createElement("option");
        option.value = color.value;
        option.textContent = color.name;
        option.style.backgroundColor = color.value;
        colorSelect.appendChild(option);
    });

    colorField.appendChild(colorLabel);
    colorField.appendChild(colorSelect);

    const footer = document.createElement("div");
    footer.classList.add("modal-footer");

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("modal-button", "cancel");
    cancelButton.textContent = "Annuler";
    cancelButton.addEventListener("click", closeModal);

    const submitButton = document.createElement("button");
    submitButton.id = "submit-project";
    submitButton.classList.add("modal-button", "create");
    submitButton.textContent = "Valider";

    submitButton.addEventListener("click", () => {
        const projectName = nameInput.value.trim();
        const projectColor = colorSelect.value;

        if (projectName === "") {
            alert("Le nom du projet est requis !");
            return;
        }


        document.dispatchEvent(new CustomEvent("projectAdded", {
            detail: { projectName, projectColor }
        }));

        closeModal();
    });

    footer.appendChild(cancelButton);
    footer.appendChild(submitButton);

    content.appendChild(nameField);
    content.appendChild(colorField);
    modal.appendChild(header);
    modal.appendChild(content);
    modal.appendChild(footer);

    document.body.appendChild(modal);
    modal.showModal();
};



document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("toggle-button");
    const sidebar = document.querySelector("aside");

    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
    });
});


