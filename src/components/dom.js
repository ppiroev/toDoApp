const getDom = {
  addTaskBtn: document.querySelector(".add-task"),
  addProjectBtn: document.querySelector(".add-project"),
  closeProjectModuleBtn: document.querySelector("#close-project-module"),
  closeTaskModuleBtn: document.querySelector("#close-task-module"),
  backgroundDim : document.querySelector(".background-dim"),
  taskModule : document.querySelector(".module-task"),
  projectModule : document.querySelector(".module-project"),
  taskCreateBtn : document.querySelector(".create-task"),
  projectCreateBtn : document.querySelector(".create-project"),
  projectsList : document.querySelector(".projects-list"),
  currentProject : document.querySelector(".current-project"),
  deleteButtons : document.querySelectorAll(".deleteTask"),
  dueToday : document.querySelector(".due-today"),
  dueThisWeek : document.querySelector(".due-this-week"),
  taskForm : document.querySelector('.task-form'),
  projectForm : document.querySelector('.project-form'),
  formInputs : document.querySelectorAll('input'),
};

export default getDom;

