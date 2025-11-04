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
const projectTitleInput = document.getElementById('project-title-input');
const projectFormBg = document.getElementById('project-form-bg');
const projectFormBox = document.getElementById('project-form-box');
projectFormBox.style.display = 'none';
let projectTitle = document.getElementById('title-of-projects');
projectFormBg.style.display = 'none';
addProjectBtn.addEventListener('click', e => {
    e.preventDefault();
    projectForm.style.display = "flex";
    projectFormBg.style.display = "block";
    projectFormBox.style.display = "flex";
    editingProject = null;
    projectTitleInput.value = '';
    project.showAllProjects();

})
projectForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newTitle = projectTitleInput.value.trim();
    if (!newTitle) return;

    if (editingProject) {

        project.editProject(editingProject, newTitle);


        if (project.getCurrentProject() === editingProject) {
            project.changeProject(newTitle);
            projectTitle.innerText = newTitle;
        }

        project.showAllProjects();
        toDo.showNotes();
        editingProject = null;
    } else {

        project.createProject(newTitle);
        project.showAllProjects();
    }
    projectFormBg.style.display = "none";
    projectFormBox.style.display = "none";
});

toDo.createToDoForm();
const form = document.getElementById('form');
const toDoFormBg = document.getElementById('to-do-form-bg');
const toDoFormBox = document.getElementById('to-do-form-box');
toDoFormBg.style.display = 'none';
form.style.display = 'none';
toDoFormBox.style.display = 'none';
const title = document.getElementById('title');
const description = document.getElementById('description');
const date = document.getElementById('dueDate');
const priority = document.getElementById('priority');
addToDoBtn.addEventListener('click', e => {
    e.preventDefault();
    form.style.display = 'flex';
    toDoFormBox.style.display = 'flex';
    toDoFormBg.style.display = 'block';
})
form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (editNote !== null) {
        toDo.editNote(editNote, title.value, description.value, date.value, priority.value);
        editNote = null;
        toDo.showNotes();
        toDoFormBox.style.display = 'none';
        form.style.display = 'none';
        toDoFormBg.style.display = 'none';

    } else {
        toDo.createNote(title.value, description.value, date.value, priority.value);
        form.style.display = 'none';
        toDoFormBox.style.display = 'none';
        toDoFormBg.style.display = 'none';
    }
    title.value = '';
    description.value = '';
    date.value = '';
    priority.value = '';


})


project.showAllProjects();
toDo.showNotes();

const projectBox = document.querySelector(".project-list");
projectBox.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('edit-project-btn')) {
        projectForm.style.display = "flex";
        projectFormBg.style.display = "block";
        projectFormBox.style.display = "flex";
        editingProject = target.dataset.title;
        projectTitleInput.value = editingProject;

    } else if (target.classList.contains('delete-project-btn')) {
        project.deleteProject(target.dataset.title);
        project.showAllProjects();
        toDo.showNotes();
    } else if (target.classList.contains('project-btn')) {
        project.changeProject(target.innerText);

        const currentItem = target.closest('.project-list-item');
        document.querySelectorAll('.project-list-item').forEach(item => {
            item.classList.remove('active');
        });
        currentItem.classList.add('active');
        // const allButtons = document.querySelectorAll('.project-btn');
        // allButtons.forEach(btn => {
        //     if (btn.innerText === project.getCurrentProject()) {
        //         btn.classList.add('active');
        //     } else {
        //         btn.classList.remove('active');
        //     }
        // })
        toDo.showNotes();
        projectTitle.innerText = project.getCurrentProject();
    }
});


const noteBox = document.querySelector(".note-box")
noteBox.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('delete-note-btn')) {
        toDo.deleteNote(Number(target.dataset.noteId));
    } else if (target.classList.contains('edit-note-btn')) {
        form.style.display = 'flex';
        toDoFormBox.style.display = 'flex';
        toDoFormBg.style.display = 'block';
        editNote = Number(target.dataset.noteId);
        const currentProjectTitle = project.getCurrentProject();
        const idx = projects.findIndex(p => p.title === currentProjectTitle);
        const note = projects[idx].notes[editNote];
        title.value = note.title;
        description.value = note.description;
        date.value = note.date;
        priority.value = note.priority;
    }
});
