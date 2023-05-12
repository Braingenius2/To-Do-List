import './style.css';
import Tasks from './tasks.js';

let tasks = [
];

// populate tasks array with data from local storage
tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

// Create a new Tasks object instance
const tasksObj = new Tasks();
tasksObj.renderTasks();

// Implement a click event listener both for enter key and click on the input element add to your list...
const newTaskElement = document.querySelector('.new-task');
newTaskElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();

    // Get the value from the input field
    const description = newTaskElement.value;
    tasksObj.addTask(description);

    // Clear the input field
    newTaskElement.value = '';

    // render an updated to do list
    tasksObj.renderTasks();
  }
});

// Implement a click event listener on the description element appropriately in tasks.js


