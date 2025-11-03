export let projects = JSON.parse(localStorage.getItem("projects")) || [{ title: 'Inbox', notes: [] }];
let currentProject = projects[0].title;
const contentBox = document.getElementById("content");
const projectBox = document.createElement('ul');
const leftBox = document.createElement('div');
const projectHeadBox = document.createElement('div');
projectHeadBox.classList.add("project-head-box");
leftBox.classList.add('left-box');
const TitleOfProjects = document.createElement('h1');
TitleOfProjects.innerText = 'Projects';
leftBox.classList.add("left-box");
const addProjectButton = document.createElement('button');
addProjectButton.innerText = "+";
addProjectButton.id = 'add-project-btn';
addProjectButton.classList.add('add-project-btn');
projectHeadBox.append(TitleOfProjects, addProjectButton);
leftBox.append(projectHeadBox,projectBox);
projectBox.classList.add("project-list");
contentBox.append(leftBox);
export  default  class Project {
    createProject(title) {
        projects.push({'title': title, 'notes': []});
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    updateProjectTitle() {
        const projectTitleElement = document.getElementById('title-of-projects');
        if (projectTitleElement) {
            projectTitleElement.innerText = this.getCurrentProject();
        }
    }

    editProject(title, newTitle) {
        const proj = projects.find(p => p.title === title);
        if (proj) {
            proj.title = newTitle;
            localStorage.setItem("projects", JSON.stringify(projects));
            if (currentProject === title) {
                currentProject = newTitle;
                this.updateProjectTitle();
            }
        }
    }
    deleteProject(title) {
        const idx = projects.findIndex(p => p.title === title);
        if (idx !== -1) {
            projects.splice(idx, 1);
            localStorage.setItem("projects", JSON.stringify(projects));
        }
    }

    getCurrentProject() {
        return currentProject;
    }

    changeProject(value) {
        currentProject = value;
        this.updateProjectTitle();
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
        formBg.id = 'project-form-bg';
        formBg.classList.add("project-form-bg");
        const projectBtnBox = document.createElement('div');
        projectBtnBox.classList.add("project-btn-box");
        const label = document.createElement("label");
        label.innerText = "Project name:";
        label.classList.add("form-label");
        const input = document.createElement("input");
        input.classList.add("form-input");
        input.type = "text";
        input.id = "project-title-input";
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
        cancelButton.classList.add("cancel-btn");
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
        for (let i= 0; i<projects.length; i++) {
            const projectItem = document.createElement("li");
            projectItem.classList.add("project-list-item");
            const projectBtn = document.createElement('button');
            projectBtn.innerText = projects[i].title;
            projectBtn.classList.add('project-btn');
            if (projects[i].title !== 'Inbox') {
                const deleteBtn = document.createElement('button');
                deleteBtn.innerText = 'Delete';
                deleteBtn.dataset.title = projects[i].title;
                deleteBtn.classList.add('delete-project-btn');
                const editBtn = document.createElement('button');
                const projectListItemBtnBox = document.createElement('div');
                projectListItemBtnBox.classList.add('project-list-item-btn-box');
                editBtn.innerText = 'Edit';
                editBtn.dataset.title = projects[i].title;
                editBtn.classList.add('edit-project-btn');
                projectListItemBtnBox.append(deleteBtn, editBtn);
                projectItem.append(projectBtn, projectListItemBtnBox);
                projectBox.appendChild(projectItem);

            } else {
                projectBtn.classList.add('active');
                projectItem.append(projectBtn);
                projectBox.appendChild(projectItem);
            }
        }
    }
}