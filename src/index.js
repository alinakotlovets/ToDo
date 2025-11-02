import ToDo from "./ToDo";
import Project, {projects} from "./projects";

const title = document.getElementById('title');
const description = document.getElementById('description');
const date = document.getElementById('dueDate');
const priority = document.getElementById('priority');
const form = document.getElementById('form');
const projectForm = document.getElementById('project-form');
const projectTitle = document.getElementById("project-title");
let editingProject = null;
let editNote = null;


const project = new Project();
const toDo = new ToDo();

projectForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (editingProject) {
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


form.addEventListener('submit', function (event) {
    if (editNote !== null) {
        toDo.editNote(editNote, title.value, description.value, date.value, priority.value);
        editNote = null;
        toDo.showNotes();

    } else {
        toDo.createNote(title.value, description.value, date.value, priority.value);
    }
    event.preventDefault();
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


const noteBox = document.querySelector(".note-box")
noteBox.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('delete-note-btn')) {
        toDo.deleteNote(target.dataset.noteId);
    } else if (target.classList.contains('edit-note-btn')) {
        editNote = target.dataset.noteId;
        const note = projects[project.getCurrentProject()][editNote];
        console.log('current project:', project.getCurrentProject());
        console.log('projects:', projects);
        console.log('editNote (index):', editNote);
        console.log('notes array:', projects[project.getCurrentProject()]);
        title.value = note.title;
        description.value = note.description;
        date.value = note.date;
        priority.value = note.priority;
    }
});
