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
    this.tasks = JSON.parse(localStorage.getItem('tasks'));
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
    }
  }

}
