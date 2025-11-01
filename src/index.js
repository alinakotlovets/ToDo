import ToDo from "./ToDo";
import Project from "./projects";
const title = document.getElementById('title');
const description = document.getElementById('description');
const date = document.getElementById('dueDate');
const priority = document.getElementById('priority');
const form = document.getElementById('form');
const projectForm = document.getElementById('project-form');
const projectTitle = document.getElementById("project-title");
let editingProject = null;




const project = new Project();
const toDo = new ToDo();

projectForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if(editingProject){
        project.editProject(editingProject, projectTitle.value);
        editingProject = null;
        project.showAllProjects();
    } else {
        project.createProject(projectTitle.value);
    }
    projectTitle.value = '';
    project.showAllProjects();
    toDo.showNotes();


})


form.addEventListener('submit', function(event){
    event.preventDefault();
    toDo.createNote(title.value, description.value, date.value, priority.value);
    title.value = '';
    description.value = '';
    date.value = '';
    priority.value = '';


})



project.showAllProjects();
toDo.showNotes();

const projectBox = document.querySelector(".project-box");
projectBox.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('edit-project-btn')) {
        editingProject = target.dataset.title;
        projectTitle.value = editingProject;
    } else if (target.classList.contains('delete-project-btn')) {
        project.deleteProject(target.dataset.title);
        project.showAllProjects();
        toDo.showNotes();
    } else if (target.classList.contains('project-btn')) {
        project.changeProject(target.innerText);
        toDo.showNotes();
    }
});



