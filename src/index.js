import './style.css';
import ToDo from "./ToDo";
import Project, {projects} from "./projects";
const addProjectBtn = document.getElementById('add-project-btn');
const addToDoBtn = document.getElementById('add-to-do');
let editingProject = null;
let editNote = null;


const project = new Project();
const toDo = new ToDo();
project.createProjectForm();
const projectForm = document.getElementById('project-form');
projectForm.style.display = 'none';
const projectTitle = document.getElementById('project-title');
const projectFormBg = document.getElementById('project-form-bg');
const projectFormBox = document.getElementById('project-form-box');
projectFormBg.style.display = 'none';
addProjectBtn.addEventListener('click', e => {
    e.preventDefault();
    projectForm.style.display = "flex";
    projectFormBg.style.display = "block";
    projectFormBox.style.display = "flex";
    editingProject = null;
    projectTitle.value = '';
    project.showAllProjects();

})
projectForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (editingProject) {
        project.editProject(editingProject, projectTitle.value);
        editingProject = null;
        project.showAllProjects();
        projectFormBg.style.display = "none";
        projectFormBox.style.display = "none";
    } else {
        project.createProject(projectTitle.value);
        project.showAllProjects();
        projectFormBg.style.display = "none";
        projectFormBox.style.display = "none";
    }
});

toDo.createToDoForm();
const form = document.getElementById('form');
form.style.display = 'none';
const title = document.getElementById('title');
const description = document.getElementById('description');
const date = document.getElementById('dueDate');
const priority = document.getElementById('priority');
addToDoBtn.addEventListener('click', e => {
    e.preventDefault();
    form.style.display = 'flex';
})
form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (editNote !== null) {
        toDo.editNote(editNote, title.value, description.value, date.value, priority.value);
        editNote = null;
        toDo.showNotes();
        form.style.display = 'none';

    } else {
        toDo.createNote(title.value, description.value, date.value, priority.value);
        form.style.display = 'none';
    }
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
    let projectTitle = document.getElementById('title-of-projects');
    if (target.classList.contains('edit-project-btn')) {
        projectForm.style.display = "flex";
        editingProject = target.dataset.title;
        projectTitle.value = editingProject;
    } else if (target.classList.contains('delete-project-btn')) {
        project.deleteProject(target.dataset.title);
        project.showAllProjects();
        toDo.showNotes();
    } else if (target.classList.contains('project-btn')) {
        project.changeProject(target.innerText);
        toDo.showNotes();
        projectTitle.innerText =  project.getCurrentProject();
    }
});


const noteBox = document.querySelector(".note-box")
noteBox.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('delete-note-btn')) {
        toDo.deleteNote(target.dataset.noteId);
    } else if (target.classList.contains('edit-note-btn')) {
        form.style.display = 'flex';
        editNote = target.dataset.noteId;
        const note = projects[project.getCurrentProject()][editNote];
        title.value = note.title;
        description.value = note.description;
        date.value = note.date;
        priority.value = note.priority;
    }
});
