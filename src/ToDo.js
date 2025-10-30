const contentBox = document.getElementById('content')

let projects = JSON.parse(localStorage.getItem("projects")) || {Default: []};

export default class ToDo {

    createNote(title, description, date, priority) {
        projects['Default'].push({"title": title, "description": description, "date": date, "priority": priority});
        localStorage.setItem("projects", JSON.stringify(projects));
        this.showNotes();
    }

    deleteNote(index) {
        let noteArray = JSON.parse(localStorage.getItem("projects"));
        noteArray['Default'].splice(index, 1);
        localStorage.setItem("projects", JSON.stringify(noteArray));
        projects = noteArray;
        this.showNotes();
    }

    showNotes() {
        contentBox.innerHTML = '';
        const localData = JSON.parse(localStorage.getItem("projects")) || {Default: []};
        for (let i = 0; i < localData['Default'].length; i++) {
            const noteBox = document.createElement('div');
            const noteTitle = document.createElement('h2');
            noteTitle.innerHTML = localData['Default'][i].title;
            const noteDescription = document.createElement('p');
            noteDescription.innerHTML = localData['Default'][i].description;
            const noteDate = document.createElement('p');
            noteDate.innerHTML = localData['Default'][i].date;
            const notePriority = document.createElement('p');
            notePriority.innerHTML = localData['Default'][i].priority;
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



