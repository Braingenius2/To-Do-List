import _ from 'lodash';
import './style.css';

const tasks = [
  {
    description: 'Go to market',
    completed: true,
    index: 1,
  },
  {
    description: 'Print articles',
    completed: false,
    index:2,
  },
  {
    description: 'Build castle',
    completed: true,
    index: 3,
  }
]

function renderTasks() {
  const tasksContainer = document.querySelector('.tasks');
  tasks.forEach(function(task) {
    const li = document.createElement('li');
    li.classList.add('task');
    const checkboxElement = document.createElement('input');
    checkboxElement.index = task.index;
    checkboxElement.checked = task.completed;
    tasksContainer.appendChild(checkboxElement);
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = task.description;
    descriptionElement.classList.add('task-description');
    tasksContainer.innerHTML += `<span class="material-icons-outlined">more_vert</span>`;
    if (task.completed) {
      descriptionElement.classList.add('completed');
    }
  });
}

renderTasks();
