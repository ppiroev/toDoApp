let projects = [];

export class Storage {
  constructor(){
    this.projects = []
  }

  save(item){
    localStorage.setItem('projects', JSON.stringify(item));
  }

  get(item){
    let currentProjects = JSON.parse(localStorage.getItem(item));
    return currentProjects
  }
}

export class Task {
  constructor(name, description, priority, dueDate) {
    (this.name = name),
      (this.description = description),
      (this.priority = priority),
      (this.dueDate = dueDate);
  }
}

export class Project {
  constructor(name) {
    this.name = name;
    this.tasks = new Array();
  }

  removeTask(name) {
    this.tasks.forEach((task, index) => {
      if (task.name === name) {
        this.tasks.splice(index, 1);
      }
    });
  }
}

export {projects}