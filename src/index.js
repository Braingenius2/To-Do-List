import './style.css';
import Tasks from './tasks.js';

const tasks = [
  // {
  //   description: 'Go to market',
  //   completed: true,
  //   index: 1,
  // },
  // {
  //   description: 'Print articles',
  //   completed: false,
  //   index: 2,
  // },
  // {
  //   description: 'Build castle',
  //   completed: true,
  //   index: 3,
  // },
];

// Implement function to render or display tasks in the list container
function renderTasks() {
  tasks.sort((a, b) => a.index - b.index);
  const tasksContainer = document.querySelector('.tasks');
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.classList.add('task');
    tasksContainer.appendChild(li);
    const checkboxElement = document.createElement('input');
    checkboxElement.type = 'checkbox';
    checkboxElement.index = task.index;
    checkboxElement.checked = task.completed;
    li.appendChild(checkboxElement);
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = task.description;
    descriptionElement.classList.add('task-description');
    li.appendChild(descriptionElement);
    li.innerHTML += '<i class="material-icons more-vert">more_vert</i>';
    if (task.completed) {
      descriptionElement.classList.add('completed');
    }
  });
}

renderTasks();


