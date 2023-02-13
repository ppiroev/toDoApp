import "./style.css";
import getDom from "./components/dom";
import {
  closeProjectModule,
  closeTaskModule,
  openProjectModule,
  openTaskModule,
  newProject,
  updateCurrentProject,
  displayProjects,
  newTask,
  displayTasksDueToday,
  displayTasksDueThisWeek,
  onLoad,
} from "./components/functions";

onLoad();

getDom.addTaskBtn.addEventListener("click", () => {
  openTaskModule();
});

getDom.addProjectBtn.addEventListener("click", () => {
  openProjectModule();
});

getDom.closeTaskModuleBtn.addEventListener("click", () => {
  closeTaskModule();
});

getDom.closeProjectModuleBtn.addEventListener("click", () => {
  closeProjectModule();
});

getDom.taskCreateBtn.addEventListener("click", () => {
  newTask();
  getDom.taskForm.reset();
  closeTaskModule();
});

getDom.projectCreateBtn.addEventListener("click", () => {
  const projectName = document.querySelector("#projectName").value;
  newProject(projectName);
  updateCurrentProject(projectName);
  getDom.projectForm.reset();
  closeProjectModule();
  displayProjects();
});

getDom.dueToday.addEventListener("click", () => {
  displayTasksDueToday();
});

getDom.dueThisWeek.addEventListener("click", () => {
  displayTasksDueThisWeek();
});