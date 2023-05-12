export default class Tasks {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  }

  addTask(description) {
    const task = {
      description: description,
      completed: false,
      index: this.tasks.length,
    };
    const tasksContainer = document.querySelector('.tasks');
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
  }

  deleteTask(index) {

  }

  editTask(index) {

  }

}
