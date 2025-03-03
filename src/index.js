import "./style.css";
import { createProject, createProjectWorkspace } from "./ui";

const projectsContainer = document.getElementById("projects-container");

const projects = [
    {
        id: 1,
        title: "Refonte du site",
        color: "red",
        taskCount: 3,
        tasks: [
            { title: "Créer la maquette", completed: false },
            { title: "Développer la page d'accueil", completed: true },
            { title: "Optimiser le référencement", completed: false }
        ]
    },
    {
        id: 2,
        title: "Application mobile",
        color: "blue",
        taskCount: 4,
        tasks: [
            { title: "Définir les fonctionnalités", completed: true },
            { title: "Créer l'UI/UX", completed: false },
            { title: "Développer l'authentification", completed: false },
            { title: "Tester l'application", completed: false }
        ]
    },
    {
        id: 3,
        title: "Stratégie marketing",
        color: "green",
        taskCount: 2,
        tasks: [
            { title: "Analyser le marché", completed: true },
            { title: "Définir les cibles", completed: false }
        ]
    },
    {
        id: 4,
        title: "Refactoring code",
        color: "purple",
        taskCount: 3,
        tasks: [
            { title: "Réorganiser les fichiers", completed: false },
            { title: "Optimiser les performances", completed: true },
            { title: "Corriger les bugs connus", completed: false }
        ]
    },
    {
        id: 5,
        title: "Test unitaire",
        color: "orange",
        taskCount: 5,
        tasks: [
            { title: "Écrire les tests de base", completed: false },
            { title: "Tester les erreurs", completed: true },
            { title: "Automatiser les tests", completed: false },
            { title: "Vérifier la couverture", completed: false },
            { title: "Corriger les erreurs détectées", completed: false }
        ]
    }
];

let currentProject = projects[0];

const handleCurrentProject = (id) => {
    currentProject = projects.find(project => project.id === id);
    createProjectWorkspace(currentProject);
};

const generateProjectsTab = (projects) => {    
    projects.forEach((project) => {
        const projectNode = createProject(project);
        projectNode.addEventListener("click", () => handleCurrentProject(project.id));
        projectsContainer.append(projectNode);
    });
};

generateProjectsTab(projects);

createProjectWorkspace(currentProject);
