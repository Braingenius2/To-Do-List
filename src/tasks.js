export default class Tasks {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  }

  // Implement method to render or display tasks in the list container
  renderTasks() {
    this.tasks.sort((a, b) => a.index - b.index);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    const tasksContainer = document.querySelector('.tasks');
    tasksContainer.innerHTML = '';
    this.tasks.forEach((task) => {
      const li = document.createElement('li');
      li.classList.add('task');
      tasksContainer.appendChild(li);
      const checkboxElement = document.createElement('input');
      checkboxElement.type = 'checkbox';
      checkboxElement.dataset.index = task.index;
      checkboxElement.checked = task.completed;
      li.appendChild(checkboxElement);
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = task.description;
      descriptionElement.classList.add('task-description');
      li.appendChild(descriptionElement);
      const rightElement = document.createElement('div');
      rightElement.classList.add('delete-container');
      rightElement.dataset.index = task.index;
      li.appendChild(rightElement);
      rightElement.innerHTML = '<i class="material-icons more-vert">more_vert</i><div class="delete"><i class="material-icons">delete</i></div>';
      // // Add click event listener to deleteIcon
      // // first deactivate click on rightElement
      // rightElement.addEventListener('click', (event) => {
      //   event.preventDefault();
      //   event.stopPropagation(); // Add this line to stop event propagation
      // });
      // const deleteIcon = rightElement.querySelector('.delete');
      // deleteIcon.addEventListener('click', (event) => {
      //   event.preventDefault();
      //   event.stopPropagation(); // Add this line to stop event propagation
      //   this.deleteTask(task.index);
      //   this.renderTasks();
      // });

      // Implement a click event listener on the description element
      descriptionElement.addEventListener('click', (event) => {
        // Replace 3 vertical dots icon in the li container with a delete icon
        // const rightElement = li.querySelector('.delete-container');
        const deleteIcon = rightElement.querySelector('.delete');
        deleteIcon.style.display = 'block';
        const moreVert = rightElement.querySelector('.more-vert');
        moreVert.style.display = 'none';

        // Toggle yellow background
        li.classList.add('clicked-task');

        // Check if the delete icon is clicked
        if (event.target.closest('.delete')) {
          this.deleteTask(task.index);
          this.renderTasks();
          return;
        }

        // Set the contentEditable property to true and focus on the element
        descriptionElement.contentEditable = true;
        descriptionElement.focus();

        // Remove outline from the element
        descriptionElement.style.outline = 'none';

        // Store original description in a variable, in case user cancels edit
        const originalDescription = descriptionElement.textContent;

        // Add  blur event listener to save the edited task description
        descriptionElement.addEventListener('blur', () => {
        // Get the new description from the element
          const newDescription = descriptionElement.textContent;

          // Set the contentEditable property back to false
          descriptionElement.contentEditable = false;

          // If new description isn't empty and different from the original
          // Update task and re-render tasks
          if (newDescription.trim() !== '' && newDescription !== originalDescription) {
            this.editTask(newDescription, task.index);
            this.renderTasks();
          } else {
            descriptionElement.textContent = originalDescription;
            this.renderTasks();
          }
        });

        // Add event listener to save the edited task description
        descriptionElement.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            event.preventDefault();

            // Trigger the blur event to save the edited task description
            descriptionElement.blur();
          }
        });
      });
      

      if (task.completed) {
        descriptionElement.classList.add('completed');
      }
    });
  }

  addTask(description) {
    const task = {
      description,
      completed: false,
      index: this.tasks.length + 1,
    };
    // this.tasks = JSON.parse(localStorage.getItem('tasks'));
    this.tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  deleteTask(index) {
    this.tasks = this.tasks.filter((task) => task.index !== parseInt(index));

    // update index of remaining objects so they represent the current list order
    for (let i = 0; i < this.tasks.length; i += 1) {
      this.tasks[i].index = i + 1;
    }
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  editTask(newDescription, index) {
    const objectIndex = this.tasks.findIndex((task) => task.index === index);
    if (objectIndex !== -1) {
      this.tasks[objectIndex].description = newDescription;
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }
}
