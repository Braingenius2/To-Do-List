export default class Tasks {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  }

  // renderTasks() {
  //   this.sortTasks();
  //   this.updateLocalStorage();
  //   const tasksContainer = document.querySelector('.tasks');
  //   tasksContainer.innerHTML = '';
  //   this.tasks.forEach((task) => {
  //     const li = document.createElement('li');
  //     li.classList.add('task');
  //     li.innerHTML = `
  //       <input type="checkbox" data-index="${task.index}" ${task.completed ? 'checked' : ''}>
  //       <p class="task-description ${task.completed ? 'completed' : ''}">${task.description}</p>
  //       <div class="delete-container" data-index="${task.index}">
  //         <i class="material-icons more-vert">more_vert</i>
  //         <div class="delete"><i class="material-icons">delete</i></div>
  //       </div>
  //     `;
  //     tasksContainer.appendChild(li);

  //     const checkboxElement = li.querySelector('input[type="checkbox"]');
  //     checkboxElement.addEventListener('change', () => {
  //       this.toggleTaskCompletion(task.index);
  //       this.renderTasks();
  //     });

  //     const descriptionElement = li.querySelector('.task-description');
  //     descriptionElement.addEventListener('click', () => {
  //       this.editTaskDescription(descriptionElement, task.index);
  //     });

  //     const deleteIcon = li.querySelector('.delete');
  //     deleteIcon.addEventListener('click', () => {
  //       this.deleteTask(task.index);
  //       this.renderTasks();
  //     });
  //   });
  // }

  renderTasks() {
    this.sortTasks();
    this.updateLocalStorage();
    const tasksContainer = document.querySelector('.tasks');
    tasksContainer.innerHTML = '';
    this.tasks.forEach((task) => {
      const li = document.createElement('li');
      li.classList.add('task');
      li.innerHTML = `
        <input type="checkbox" data-index="${task.index}" ${task.completed ? 'checked' : ''}>
        <p class="task-description ${task.completed ? 'completed' : ''}">${task.description}</p>
        <div class="delete-container" data-index="${task.index}">
          <i class="material-icons more-vert">more_vert</i>
          <div class="delete"><i class="material-icons">delete</i></div>
        </div>
      `;
      tasksContainer.appendChild(li);
  
      const checkboxElement = li.querySelector('input[type="checkbox"]');
      checkboxElement.addEventListener('change', () => {
        this.toggleTaskCompletion(task.index);
        this.updateLocalStorage();
        this.renderTasks();
      });
  
      const descriptionElement = li.querySelector('.task-description');
      descriptionElement.addEventListener('click', () => {
        this.editTaskDescription(descriptionElement, task.index);
      });
  
      const deleteIcon = li.querySelector('.delete');
      deleteIcon.addEventListener('click', () => {
        this.deleteTask(task.index);
        this.updateLocalStorage();
        this.renderTasks();
      });
    });
  
    const clearCompletedElement = document.querySelector('.clear');
    clearCompletedElement.addEventListener('click', () => {
      this.tasks = this.tasks.filter((task) => !task.completed);
      this.updateTaskIndexes();
      this.updateLocalStorage();
      this.renderTasks();
    });
  }
  

  addTask(description) {
    const task = {
      description,
      completed: false,
      index: this.tasks.length + 1,
    };
    this.tasks.push(task);
  }

  deleteTask(index) {
    this.tasks = this.tasks.filter((task) => task.index !== index);
    this.updateTaskIndexes();
  }

  // editTaskDescription(descriptionElement, index) {
  //   descriptionElement.contentEditable = true;
  //   descriptionElement.focus();
  //   const originalDescription = descriptionElement.textContent;
  //   descriptionElement.addEventListener('blur', () => {
  //     const newDescription = descriptionElement.textContent.trim();
  //     if (newDescription && newDescription !== originalDescription) {
  //       this.tasks.find((task) => task.index === index).description = newDescription;
  //       this.updateLocalStorage();
  //     } else {
  //       descriptionElement.textContent = originalDescription;
  //     }
  //     descriptionElement.contentEditable = false;
  //   });
  //   descriptionElement.addEventListener('keydown', (event) => {
  //     if (event.key === 'Enter') {
  //       event.preventDefault();
  //       descriptionElement.blur();
  //     }
  //   });
  // }

  editTaskDescription(descriptionElement, index) {
    const li = descriptionElement.closest('.task');
    li.classList.add('clicked-task');
    const deleteIcon = li.querySelector('.delete');
    deleteIcon.style.display = 'block';
    const moreVert = li.querySelector('.more-vert');
    moreVert.style.display = 'none';

    descriptionElement.contentEditable = true;
    descriptionElement.focus();
    const originalDescription = descriptionElement.textContent;
    descriptionElement.addEventListener('blur', () => {
      const newDescription = descriptionElement.textContent.trim();
      if (newDescription && newDescription !== originalDescription) {
        this.tasks.find((task) => task.index === index).description = newDescription;
        this.updateLocalStorage();
      } else {
        descriptionElement.textContent = originalDescription;
      }
      descriptionElement.contentEditable = false;
      li.classList.remove('clicked-task');
      deleteIcon.style.display = 'none';
      moreVert.style.display = 'block';
    });
    descriptionElement.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        descriptionElement.blur();
      }
    });

    deleteIcon.addEventListener('click', () => {
      this.deleteTask(index);
      this.renderTasks();
    });
  }

  toggleTaskCompletion(index) {
    const task = this.tasks.find((task) => task.index === index);
    task.completed = !task.completed;
  }

  sortTasks() {
    this.tasks.sort((a, b) => a.index - b.index);
  }

  updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  updateTaskIndexes() {
    this.tasks.forEach((task, index) => {
      task.index = index + 1;
    });
    this.updateLocalStorage();
  }
}
