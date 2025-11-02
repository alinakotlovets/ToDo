export let projects = JSON.parse(localStorage.getItem("projects")) || {Default: []};
let currentProject = "Default";
const contentBox = document.getElementById("content");
const projectBox = document.createElement('ul');
projectBox.classList.add("project-box");
export  default  class Project {
    createProject(title) {
        projects[title] = [];
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    editProject(title, newTitle) {
        const notes = projects[title];
        delete projects[title];
        projects[newTitle] = notes || [];
        localStorage.setItem("projects", JSON.stringify(projects));
    }
    deleteProject(title) {
        delete projects[title];
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    getCurrentProject() {
        return currentProject;
    }

    changeProject(value) {
        currentProject = value;
    }


    showAllProjects() {

        projectBox.innerHTML = '';
        let key = Object.keys(projects);
        for (let i in key) {
            const projectItem = document.createElement("li");
            const projectBtn = document.createElement('button');
            projectBtn.innerText = key[i];
            projectBtn.classList.add('project-btn');
            if (key[i] !== 'Default') {
                const deleteBtn = document.createElement('button');
                deleteBtn.innerText = 'Delete';
                deleteBtn.dataset.title = key[i];
                deleteBtn.classList.add('delete-project-btn');
                const editBtn = document.createElement('button');
                editBtn.innerText = 'Edit';
                editBtn.dataset.title = key[i];
                editBtn.classList.add('edit-project-btn');
                projectItem.append(projectBtn, deleteBtn, editBtn);
                projectBox.appendChild(projectItem);
                contentBox.appendChild(projectBox);

            } else {
                projectItem.append(projectBtn);
                projectBox.appendChild(projectItem);
                contentBox.appendChild(projectBox);
            }
        }
    }
}