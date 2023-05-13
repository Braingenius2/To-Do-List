import './style.css';
import Tasks from './tasks.js';

// Create a new Tasks object instance
const tasksObj = new Tasks();
tasksObj.renderTasks();

// Implement a click event listener on newTaskElement
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

// // implement a click event listener on all delete icons
// const deleteIcons = document.querySelectorAll('.delete');
//   deleteIcons.forEach((deleteIcon) => {
//     deleteIcon.addEventListener('click', (event) => {
//       const parent = event.target.parentNode;
//       const index = parent.dataset.index; // Get the task index from the parent element
//       tasksObj.tasks.deletetask(parseInt(index, 10)); // Convert the index to an integer before passing to deleteTask
//       tasksObj.renderTasks();
//     });
//   });