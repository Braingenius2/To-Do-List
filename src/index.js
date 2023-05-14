import './style.css';
import Tasks from './tasks.js';

const tasksObj = new Tasks();
tasksObj.renderTasks();

const newTaskElement = document.querySelector('.new-task');
newTaskElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    const description = newTaskElement.value.trim();
    if (description) {
      tasksObj.addTask(description);
      newTaskElement.value = '';
      tasksObj.renderTasks();
    }
  }
});