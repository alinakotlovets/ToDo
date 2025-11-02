export let projects = JSON.parse(localStorage.getItem("projects")) || {Inbox: []};
let currentProject = "Inbox";
const contentBox = document.getElementById("content");
const projectBox = document.createElement('ul');
const leftBox = document.createElement('div');
leftBox.classList.add("left-box");
const addProjectButton = document.createElement('button');
addProjectButton.innerText = "add project";
addProjectButton.id = 'add-project-btn';
leftBox.append(addProjectButton,projectBox);
projectBox.classList.add("project-box");
contentBox.append(leftBox);
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

    createProjectForm(title){
        const form = document.createElement('form')
        form.classList.add("project-form");
        form.id = "project-form";
        form.classList.add('project-form');
        const formBox = document.createElement('div');
        formBox.id = "project-form-box";
        formBox.classList.add("project-form-box");
        const formBg = document.createElement('div');
        const projectBtnBox = document.createElement('div');
        projectBtnBox.classList.add("project-btn-box");
        formBg.id = 'project-form-bg';
        formBg.classList.add("project-form-bg");
        const label = document.createElement("label");
        label.innerText = "Project name:";
        label.classList.add("form-label");
        const input = document.createElement("input");
        input.classList.add("form-input");
        input.type = "text";
        input.id = "project-title";
        input.value = title || null;
        input.required = true;
        const addButton = document.createElement("button");
        addButton.innerText = "Submit";
        addButton.classList.add("submit-btn");
        addButton.id = "project-button";
        addButton.type = "submit";
        const cancelButton = document.createElement("button");
        cancelButton.innerText = "Cancel";
        cancelButton.type = "button";
        cancelButton.classList.add("delete-btn");
        cancelButton.id = "project-cansel-button";
        projectBtnBox.append(addButton, cancelButton);
        form.append(label, input, projectBtnBox);
        formBox.append(form);
        formBg.addEventListener('click', e => {
            formBox.style.display = "none";
            formBg.style.display = "none";
        })
        cancelButton.addEventListener("click", () => {
            formBox.style.display = "none";
            formBg.style.display = "none";
        })
        contentBox.append(formBox, formBg);
    }


    showAllProjects() {

        projectBox.innerHTML = '';
        let key = Object.keys(projects);
        for (let i in key) {
            const projectItem = document.createElement("li");
            const projectBtn = document.createElement('button');
            projectBtn.innerText = key[i];
            projectBtn.classList.add('project-btn');
            if (key[i] !== 'Inbox') {
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

            } else {
                projectItem.append(projectBtn);
                projectBox.appendChild(projectItem);
            }
        }
    }
}