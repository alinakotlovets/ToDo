const contentBox = document.getElementById('content');
const noteBox = document.createElement('ul');
noteBox.classList.add('note-box');
import Project from "./projects";
import {projects} from "./projects";

const project = new Project();


export default class ToDo {

    createNote(title, description, date, priority) {
        projects[project.getCurrentProject()].push({"title": title, "description": description, "date": date, "priority": priority});
        localStorage.setItem("projects", JSON.stringify(projects));
        this.showNotes();
    }

    deleteNote(index) {
        projects[project.getCurrentProject()].splice(index, 1);
        localStorage.setItem("projects", JSON.stringify(projects));
        this.showNotes();
    }

    editNote(index, title, description, date, priority) {
        let currentNote = projects[project.getCurrentProject()][index];
        currentNote.title = title;
        currentNote.description = description || null;
        currentNote.date = date || null;
        currentNote.priority = priority;
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    showNotes() {
        noteBox.innerHTML = '';
        const localData = JSON.parse(localStorage.getItem("projects")) || {Default: []};
        const notesArray = localData[project.getCurrentProject()] || [];
        for (let i = 0; i < notesArray.length; i++) {
            const noteItem = document.createElement('li');
            const noteTitle = document.createElement('h2');
            noteTitle.innerHTML = localData[project.getCurrentProject()][i].title;
            const noteDescription = document.createElement('p');
            noteDescription.innerHTML = localData[project.getCurrentProject()][i].description;
            const noteDate = document.createElement('p');
            noteDate.innerHTML = localData[project.getCurrentProject()][i].date;
            const notePriority = document.createElement('p');
            notePriority.innerHTML = localData[project.getCurrentProject()][i].priority;
            const deleteNoteBtn = document.createElement('button');
            deleteNoteBtn.innerText = 'delete';
            deleteNoteBtn.classList.add('delete-note-btn');
            deleteNoteBtn.dataset.noteId = i;
            const editNoteBtn = document.createElement('button');
            editNoteBtn.innerText = 'edit';
            editNoteBtn.classList.add('edit-note-btn');
            editNoteBtn.dataset.noteId = i;
            noteItem.append(noteTitle, noteDescription, noteDate, notePriority, deleteNoteBtn, editNoteBtn);
            noteBox.append(noteItem);
            contentBox.appendChild(noteBox);
        }
    }
}



