import Project from "./projects";
import {projects} from "./projects";

const contentBox = document.getElementById('content');
const noteBox = document.createElement('ul');
noteBox.classList.add('note-box');
const rightBox = document.createElement('div');
rightBox.className = 'right-box';
const addToDoBtn = document.createElement('button');
addToDoBtn.classList.add('add-to-do-btn');
addToDoBtn.innerText = 'Add To Do';
addToDoBtn.id = 'add-to-do';
noteBox.classList.add('note-box');


const project = new Project();
const projectTitle = document.createElement('h1');
projectTitle.id = 'title-of-projects';
const noteHeadBox = document.createElement('div');
noteHeadBox.classList.add('note-head-box');
noteHeadBox.append(projectTitle, addToDoBtn);
projectTitle.innerText = project.getCurrentProject();
rightBox.append(noteHeadBox, noteBox);
contentBox.append(rightBox);


export default class ToDo {

    createNote(title, description, date, priority) {
        let projectTitle = project.getCurrentProject();
        const idx = projects.findIndex(p => p.title === projectTitle);
        if (idx !== -1) {
            projects[idx].notes.push({"title": title, "description": description, "date": date, "priority": priority, "isDone" : false});
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
                const noteCheckbox = document.createElement('input');
                noteCheckbox.type = 'checkbox';
                noteCheckbox.id = 'noteCheckbox';
                noteCheckbox.classList.add('note-checkbox');
                noteItem.classList.add('note-list-item');
                const noteTitle = document.createElement('h2');
                noteTitle.classList.add('note-title');
                noteTitle.innerHTML = notesArray[i].title;
                const noteTextBox = document.createElement('div');
                noteTextBox.classList.add('note-text-box');
                const noteDateBox = document.createElement('div');
                noteDateBox.classList.add('note-date-box');
                const noteDescription = document.createElement('p');
                noteDescription.innerHTML = notesArray[i].description;
                noteDescription.classList.add('note-description');
                const noteDate = document.createElement('p');
                noteDate.innerHTML = notesArray[i].date;
                const notePriority = document.createElement('p');
                notePriority.innerHTML = notesArray[i].priority;
                const noteBtnBox = document.createElement('div');
                noteBtnBox.classList.add('note-btn-box');
                const deleteNoteBtn = document.createElement('button');
                deleteNoteBtn.innerText = 'Delete';
                deleteNoteBtn.classList.add('delete-note-btn');
                deleteNoteBtn.dataset.noteId = i;
                const editNoteBtn = document.createElement('button');
                editNoteBtn.innerText = 'Edit';
                editNoteBtn.classList.add('edit-note-btn');
                editNoteBtn.dataset.noteId = i;

                function isData(value, title, item, fatherBox){
                    if(value !== null && value !== undefined && value !== '') {
                        const h2 = document.createElement('h3');
                        h2.classList.add(`note-label`);
                        h2.innerHTML = title;
                        fatherBox.append(h2, item);
                    } else {fatherBox.appendChild(item);}
                }
                if (notesArray[i].isDone) {
                    noteCheckbox.checked = true;
                    noteItem.classList.add('done');
                    noteTitle.classList.add('done-title');
                }
                noteCheckbox.addEventListener('change', () => {
                    if (noteCheckbox.checked) {
                        noteItem.classList.add('done');
                        noteTitle.classList.add('done-title');
                        notesArray[i].isDone = true;
                    } else {
                        noteItem.classList.remove('done');
                        noteTitle.classList.remove('done-title');
                        notesArray[i].isDone = false;
                    }

                    localStorage.setItem("projects", JSON.stringify(projects));
                });

                noteTextBox.appendChild(noteTitle);
                isData(notesArray[i].description, 'Description:', noteDescription, noteTextBox);
                isData(notesArray[i].date, 'Due date:', noteDate, noteDateBox);
                isData(notesArray[i].priority, 'Priority:', notePriority, noteDateBox);
                noteBtnBox.append(deleteNoteBtn, editNoteBtn);
                noteItem.append(noteCheckbox,noteTextBox, noteDateBox, noteBtnBox);
                noteBox.append(noteItem);
            }
        }
    }
}



