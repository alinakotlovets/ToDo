import Project from "./projects";
import {projects} from "./projects";

const contentBox = document.getElementById('content');
const noteBox = document.createElement('ul');
const rightBox = document.createElement('div');
const addToDoBtn = document.createElement('button');
addToDoBtn.innerText = 'Add To Do';
addToDoBtn.id = 'add-to-do';
noteBox.classList.add('note-box');


const project = new Project();
const projectTitle = document.createElement('h1');
projectTitle.id = 'title-of-projects';
projectTitle.innerText = project.getCurrentProject();
rightBox.append(projectTitle, addToDoBtn, noteBox);
contentBox.append(rightBox);


export default class ToDo {

    createNote(title, description, date, priority) {
        let projectTitle = project.getCurrentProject();
        const idx = projects.findIndex(p => p.title === projectTitle);
        if (idx !== -1) {
            projects[idx].notes.push({"title": title, "description": description, "date": date, "priority": priority});
            localStorage.setItem("projects", JSON.stringify(projects));
            this.showNotes();
        }
    }

    deleteNote(index) {
        let projectTitle = project.getCurrentProject();
        const idx = projects.findIndex(p => p.title === projectTitle);
        if (idx !== -1) {
            projects[idx].notes.splice(index, 1);
            localStorage.setItem("projects", JSON.stringify(projects));
            this.showNotes();
        }
    }

    editNote(index, title, description, date, priority) {
        let projectTitle = project.getCurrentProject();
        const idx = projects.findIndex(p => p.title === projectTitle);
        if (idx !== -1) {
            let currentNote = projects[idx].notes[index];
            currentNote.title = title;
            currentNote.description = description !== undefined ? description : currentNote.description;
            currentNote.date = date !== undefined ? date : currentNote.date;
            currentNote.priority = priority !== undefined ? priority : currentNote.priority;
            localStorage.setItem("projects", JSON.stringify(projects));
            this.showNotes();
        }
    }

    createToDoForm() {
        const toDoFormBox = document.createElement('div');
        toDoFormBox.id = 'to-do-form-box';
        toDoFormBox.classList.add('to-do-form-box');
        const toDoBg = document.createElement('div');
        toDoBg.id = 'to-do-form-bg';
        toDoBg.classList.add('to-do-form-bg');
        const form = document.createElement('form');
        form.id = 'form';
        form.classList.add('to-do-form');
        const title = document.createElement('label');
        title.classList.add('form-label');
        title.innerText = 'Title:';
        const titleInput = document.createElement('input');
        titleInput.classList.add("form-input");
        titleInput.id = 'title';
        titleInput.type = 'text';
        titleInput.required = true;
        const description = document.createElement('label')
        description.classList.add('form-label');
        description.innerText = 'Description:';
        const descriptionInput = document.createElement('textarea');
        descriptionInput.classList.add("form-textarea");
        descriptionInput.id = 'description';
        const date = document.createElement('label');
        date.classList.add('form-label');
        date.innerText = 'Date:';
        const dateInput = document.createElement('input');
        dateInput.classList.add("form-input");
        dateInput.id = 'dueDate';
        dateInput.type = 'date';
        const priority = document.createElement('label');
        priority.classList.add('form-label');
        priority.innerText = 'Priority:';
        const prioriSelect = document.createElement('select');
        prioriSelect.classList.add('form-input');
        prioriSelect.id = 'priority';
        const priorityOptionHigh = document.createElement('option');
        priorityOptionHigh.innerText = 'high';
        const priorityOptionLow = document.createElement('option');
        priorityOptionLow.innerText = 'low';
        const priorityOptionMedium = document.createElement('option');
        priorityOptionMedium.innerText = 'medium';
        const toDoBtnBox = document.createElement('div');
        toDoBtnBox.classList.add('to-do-btn-box');
        const addButton = document.createElement('button');
        addButton.classList.add('submit-btn');
        addButton.id = 'add-to-do-btn';
        addButton.type = 'submit';
        addButton.innerText = 'Submit';
        const cancelButton = document.createElement('button');
        cancelButton.classList.add('cancel-btn');
        cancelButton.id = 'cancel-to-do-button';
        cancelButton.innerText = 'Cancel';
        prioriSelect.append(priorityOptionHigh, priorityOptionLow, priorityOptionMedium);
        toDoBg.addEventListener('click', e => {
            toDoFormBox.style.display = 'none';
            toDoBg.style.display = 'none';
        })
        cancelButton.addEventListener('click', e => {
            toDoFormBox.style.display = 'none';
            toDoBg.style.display = 'none';
        })
        toDoBtnBox.append(addButton, cancelButton);
        form.append(title, titleInput, description, descriptionInput, date, dateInput, priority, prioriSelect, toDoBtnBox);
        toDoFormBox.appendChild(form);
        contentBox.append(toDoBg, toDoFormBox);


    }

    showNotes() {
        noteBox.innerHTML = '';
        const currentProjectTitle = project.getCurrentProject();
        const idx = projects.findIndex(p => p.title === currentProjectTitle);
        if (idx !== -1) {
            const notesArray = projects[idx].notes;
            for (let i = 0; i < notesArray.length; i++) {
                const noteItem = document.createElement('li');
                const noteTitle = document.createElement('h2');
                noteTitle.innerHTML = notesArray[i].title;
                const noteDescription = document.createElement('p');
                noteDescription.innerHTML = notesArray[i].description;
                const noteDate = document.createElement('p');
                noteDate.innerHTML = notesArray[i].date;
                const notePriority = document.createElement('p');
                notePriority.innerHTML = notesArray[i].priority;
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
}



