import "./style.css";
import { createProject, createProjectWorkspace, createProjectModal } from "./ui";
import { ProjectManager, Project } from "./projects";

const projectsContainer = document.getElementById("projects-container");
const openModalButton = document.querySelector("#project-label > button");

const projectManager = new ProjectManager();
const projects = projectManager.getAllProjects();

let currentProject = projects.length > 0 ? projects[0] : null;

const handleCurrentProject = (id) => {
    const updatedProjects = projectManager.getAllProjects();
    currentProject = updatedProjects.find(project => project.id === id);
    
    if (currentProject) {
        createProjectWorkspace(currentProject, projectManager, generateProjectsTab);
    } else {
        console.error("Projet non trouvé !");
    }
};


export const generateProjectsTab = () => {
    projectsContainer.innerHTML = ""; 
    const projects = projectManager.getAllProjects()
    console.log(projects)
    if (projectsContainer) {
        projects.forEach((project) => {
            const projectNode = createProject(project);
            projectNode.addEventListener("click", () => handleCurrentProject(project.id));
            projectsContainer.append(projectNode);
        });
    }
};

if (openModalButton) {
    openModalButton.addEventListener("click", createProjectModal);
} else {
    console.error("Le bouton de modal est introuvable.");
}

document.addEventListener("projectAdded", (event) => {
    const { projectName, projectColor } = event.detail;

    const newProject = new Project(projectName, projectColor, []);
    projectManager.addProject(newProject);

    const nodeNewProject = createProject(newProject);
    nodeNewProject.addEventListener("click", () => handleCurrentProject(newProject.id));
    projectsContainer.append(nodeNewProject);

    if (!currentProject) {
        currentProject = newProject;
        createProjectWorkspace(currentProject, projectManager);
        generateProjectsTab()
    }
});


if (currentProject) {
    createProjectWorkspace(currentProject, projectManager, generateProjectsTab);
}
