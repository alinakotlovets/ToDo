import ToDo from "./ToDo";
const title = document.getElementById('title');
const description = document.getElementById('description');
const date = document.getElementById('dueDate');
const priority = document.getElementById('priority');
// const submitBtn = document.getElementById('submit-btn');
const form = document.querySelector('form');

const toDo = new ToDo();


form.addEventListener('submit', function(event){
    event.preventDefault();
    toDo.createNote(title.value, description.value, date.value, priority.value);
    title.value = '';
    description.value = '';
    date.value = '';
    priority.value = '';


})

toDo.showNotes();