import Project from "./projects";
import {projects} from "./projects";
const contentBox = document.getElementById('content');
const noteBox = document.createElement('ul');
const rightBox = document.createElement('div');
const addToDoBtn = document.createElement('button');
const projectTitle = document.createElement('h1');
projectTitle.id = 'title-of-projects'
addToDoBtn.innerText = 'Add To Do';
addToDoBtn.id = 'add-to-do';
noteBox.classList.add('note-box');


const project = new Project();
projectTitle.innerText = project.getCurrentProject();
rightBox.append(projectTitle, addToDoBtn, noteBox);
contentBox.append(rightBox);





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

    createToDoForm(){
        const form = document.createElement('form');
        form.id = 'form';
        form.classList.add('to-do-form');
        const title = document.createElement('label');
        title.innerText = 'Title:';
        const titleInput = document.createElement('input');
        titleInput.id = 'title';
        titleInput.type = 'text';
        titleInput.required = true;
        const description = document.createElement('label')
        description.innerText = 'Description:';
        const descriptionInput = document.createElement('input');
        descriptionInput.id = 'description';
        descriptionInput.type = 'text';
        const date = document.createElement('label');
        date.innerText = 'Date:';
        const dateInput = document.createElement('input');
        dateInput.id = 'dueDate';
        dateInput.type = 'date';
        const priority = document.createElement('label');
        priority.innerText = 'Priority:';
        const prioriSelect = document.createElement('select');
        prioriSelect.id = 'priority';
        const priorityOptionHigh = document.createElement('option');
        priorityOptionHigh.innerText = 'high';
        const priorityOptionLow = document.createElement('option');
        priorityOptionLow.innerText = 'low';
        const priorityOptionMedium = document.createElement('option');
        priorityOptionMedium.innerText = 'medium';
        const addButton = document.createElement('button');
        addButton.id = 'add-to-do-btn';
        addButton.type = 'submit';
        addButton.innerText = 'Submit';
        const cancelButton = document.createElement('button');
        cancelButton.id = 'cancel-to-do-button';
        cancelButton.innerText = 'Cancel';
        prioriSelect.append(priorityOptionHigh, priorityOptionLow, priorityOptionMedium);
        cancelButton.addEventListener('click', e => {
            form.style.display = 'none';
        })
        form.append(title, titleInput, description, descriptionInput, date, dateInput, prioriSelect, addButton, cancelButton);
        contentBox.appendChild(form);


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
        }
    }
}



