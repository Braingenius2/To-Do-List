export default class Tasks {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  }

  // Implement method to render or display tasks in the list container
  renderTasks() {
  this.tasks.sort((a, b) => a.index - b.index);
  const tasksContainer = document.querySelector('.tasks');
  this.tasks.forEach((task) => {
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

    // Implement a click event listener on the description element
    descriptionElement.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = text;
      descriptionElement.textContent = '';
      descriptionElement.appendChild(input);
      input.focus();
      input.addEventListener('blur', () => {
        const newDescription = input.value;
        const index = task.index;
        this.editTask(newDescription, index);

        // Replace deleteIcon with 3 vertical dots
        const deleteIcon = document.querySelector('.delete');
        deleteIcon.style.display = 'none';
        const moreVert = document.querySelector('.more-vert');
        moreVert.style.display = 'block';

        // Toggle yellow background
        li.classList.toggle('clicked-task');
      });

      // Also replace 3 vertical dots icon in the li container with a delete icon
      const deleteIcon = document.querySelector('.delete');
      deleteIcon.style.display = 'block';
      const moreVert = document.querySelector('.more-vert');
      moreVert.style.display = 'none';
      

      // Also toggle yellow background
      li.classList.toggle('clicked-task');
    });
    li.innerHTML += '<i class="material-icons more-vert">more_vert</i>';
    li.innerHTML += '<i class="material-icons delete">delete</i>';
    if (task.completed) {
      descriptionElement.classList.add('completed');
    }
  });
  }

  addTask(description) {
    const task = {
      description: description,
      completed: false,
      index: this.tasks.length,
    };
    // this.tasks = JSON.parse(localStorage.getItem('tasks'));
    this.tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  deleteTask(index) {
    this.tasks = JSON.parse(localStorage.getItem('tasks'));
    this.tasks = this.tasks.filter((task) => task.index !== parseInt(index, 10));

    // update index of remaining objects so they represent the current list order
    this.tasks.forEach(task => {
      task.index = this.tasks.length;
    });
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }

  editTask(newDescription, index) {
    this.tasks = JSON.parse(localStorage.getItem('tasks'));
    const objectIndex = this.tasks.findIndex(task => task.index === index);
    if (objectIndex !== -1) {
      this.tasks[index].description = newDescription;
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

}
