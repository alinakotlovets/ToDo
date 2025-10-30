const contentBox = document.getElementById('content')
let note = JSON.parse(localStorage.getItem("todos")) || [];

export default class ToDo {


    createNote(title, description, date, priority) {

        note.push({"title": title, "description": description, "date": date, "priority": priority});
        localStorage.setItem("todos", JSON.stringify(note));
        this.showNotes();


    }

    deleteNote(index) {
        let noteArray = JSON.parse(localStorage.getItem("todos"));
        noteArray.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(noteArray));
        note = noteArray;
        this.showNotes();
    }

    showNotes() {
        contentBox.innerHTML = '';
        const localData = JSON.parse(localStorage.getItem("todos"));
        for (let i = 0; i < localData.length; i++) {
            const noteBox = document.createElement('div');
            const noteTitle = document.createElement('h2');
            noteTitle.innerHTML = localData[i].title;
            const noteDescription = document.createElement('p');
            noteDescription.innerHTML = localData[i].description;
            const noteDate = document.createElement('p');
            noteDate.innerHTML = localData[i].date;
            const notePriority = document.createElement('p');
            notePriority.innerHTML = localData[i].priority;
            const deleteNoteBtn = document.createElement('button');
            deleteNoteBtn.innerText = 'delete';

            noteBox.append(noteTitle, noteDescription, noteDate, notePriority, deleteNoteBtn);
            contentBox.appendChild(noteBox);


            deleteNoteBtn.addEventListener('click', () => {
                this.deleteNote(i);
            })
        }
    }
}



