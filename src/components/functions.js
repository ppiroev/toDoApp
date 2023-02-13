import getDom from "./dom";
import { Task, Project, Storage } from "./classes";
import { isToday, isThisWeek } from "date-fns";

const storage = new Storage();

function closeProjectModule() {
  getDom.backgroundDim.classList.add("hidden");
  getDom.projectModule.classList.add("hidden");
}

function closeTaskModule() {
  getDom.backgroundDim.classList.add("hidden");
  getDom.taskModule.classList.add("hidden");
}

function openProjectModule() {
  getDom.backgroundDim.classList.remove("hidden");
  getDom.projectModule.classList.remove("hidden");
}

function openTaskModule() {
  getDom.backgroundDim.classList.remove("hidden");
  getDom.taskModule.classList.remove("hidden");
}

// Creates a new Project object and pushes it into the projects array.
function newProject(name) {
  const project = new Project(name);
  let currentProjectsList = storage.get("projects");
  currentProjectsList.push(project);
  storage.save(currentProjectsList);
}
// Creates a new Task object and pushes it into the selected Project's array.
function newTask() {
  const taskName = document.querySelector("#taskName").value;
  const taskDescription = document.querySelector("#taskDescription").value;
  const taskPriority = document.querySelector("#taskPriority").value;
  const taskDueDate = document.querySelector("#taskDueDate").value;
  const task = new Task(taskName, taskDescription, taskPriority, taskDueDate);

  let currentProjectsList = storage.get("projects");

  currentProjectsList.forEach((project) => {
    const selectedProject = getDom.currentProject.textContent;
    if (project.name === selectedProject) {
      project.tasks.push(task);
      storage.save(currentProjectsList);
      displayTasks(selectedProject);
    }
  });
}
// Creates the HTML elements and calls the Display Tasks function.
function createTask(name, dscrp, prio, due) {
  const task = document.createElement("div");
  task.classList.add("task");

  const taskDetails = document.createElement("div");
  taskDetails.classList.add("task-details");

  const title = document.createElement("h3");
  title.textContent = name;
  const description = document.createElement("p");
  description.textContent = dscrp;
  taskDetails.append(title, description);

  const priority = document.createElement("p");
  priority.textContent = `Priority: ${prio}`;

  const dueDate = document.createElement("p");
  dueDate.textContent = `Due Date: ${due}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.classList.add("deleteTask");
  const icon = document.createElement("i");
  icon.classList.add("fa-sharp", "fa-solid", "fa-circle-check");
  deleteBtn.append(icon);

  deleteBtn.addEventListener("click", () => {
    let currentProjectsList = storage.get("projects");
    const selectedProject = getDom.currentProject.textContent;
    currentProjectsList.forEach((project) => {
      let projectHolder = new Project();
      Object.assign(projectHolder, project);
      projectHolder.removeTask(title.textContent);
      storage.save(currentProjectsList);
    });
    displayTasks(selectedProject);
  });

  task.append(taskDetails, priority, dueDate, deleteBtn);

  const tasksList = document.querySelector(".task-list");
  tasksList.append(task);
}

function updateCurrentProject(selectedProject) {
  getDom.currentProject.textContent = selectedProject;
  displayTasks(selectedProject);
}
// Displays all projects. First removes the existing HTML elements, then creates them again with the updated list and appends.

function displayProjects() {
  const createdProjects = document.querySelectorAll(".project-item");
  createdProjects.forEach((p) => {
    p.remove();
  });

  let currentProjectsList = storage.get("projects");

  currentProjectsList.forEach((project) => {
    const li = document.createElement("li");
    li.classList.add("project-item");
    const p = document.createElement("p");
    const deleteProject = document.createElement("i");
    deleteProject.classList.add(
      "fa-sharp",
      "fa-solid",
      "fa-trash",
      "delete-project"
    );
    deleteProject.addEventListener("click", () => {
      removeProject(p.textContent);
      displayProjects();
      displayTasksDueToday();
    });
    p.classList.add("project-name");
    p.textContent = project.name;
    li.append(p, deleteProject);
    p.addEventListener("click", (event) => {
      const selectedProject = event.target.textContent;
      updateCurrentProject(selectedProject);
    });
    getDom.projectsList.insertBefore(li, getDom.addProjectBtn);
  });
}

// Removes the project from the projects array based on the name of the project that is sent to the function.
function removeProject(projectName) {
  let currentProjectsList = storage.get("projects");

  currentProjectsList.forEach((project, index) => {
    if (project.name === projectName) {
      currentProjectsList.splice(index, 1);
      storage.save(currentProjectsList);
    }
  });
}

// Displays all tasks depending on the selected project. First removes the existing HTML elements, then creates them again with the updated list and appends.
function displayTasks(selectedProject) {
  if (selectedProject === "Today") {
    displayTasksDueToday();
  } else if (selectedProject === "This Week") {
    displayTasksDueThisWeek();
  } else {
    const currDisplayedTasks = document.querySelectorAll(".task");
    currDisplayedTasks.forEach((currTask) => {
      currTask.remove();
    });

    let currentProjectsList = storage.get("projects");
    currentProjectsList.forEach((project) => {
      if (project.name === selectedProject) {
        project.tasks.forEach((task) => {
          createTask(task.name, task.description, task.priority, task.dueDate);
        });
      }
    });
  }
}
// Checks all tasks and their due dates and displays the once that are due today.
function displayTasksDueToday() {
  getDom.currentProject.textContent = "Today";
  getDom.addTaskBtn.classList.add("hidden");

  const currDisplayedTasks = document.querySelectorAll(".task");
  currDisplayedTasks.forEach((currTask) => {
    currTask.remove();
  });

  let currentProjectsList = storage.get("projects");

  currentProjectsList.forEach((project) => {
    project.tasks.forEach((task) => {
      if (isToday(new Date(task.dueDate))) {
        createTask(task.name, task.description, task.priority, task.dueDate);
      }
    });
  });
}
// Checks all projects and their tasks for the ones that have a due date within this week and displays them.
function displayTasksDueThisWeek() {
  getDom.currentProject.textContent = "This Week";
  getDom.addTaskBtn.classList.add("hidden");

  const currDisplayedTasks = document.querySelectorAll(".task");
  currDisplayedTasks.forEach((currTask) => {
    currTask.remove();
  });

  let currentProjectsList = storage.get("projects");

  currentProjectsList.forEach((project) => {
    project.tasks.forEach((task) => {
      if (isThisWeek(new Date(task.dueDate), { weekStartsOn: 1 })) {
        createTask(task.name, task.description, task.priority, task.dueDate);
      }
    });
  });
}

function onLoad() {
  if (localStorage.projects === undefined) {
    localStorage.setItem("projects", JSON.stringify([]));
  }

  displayProjects();
  displayTasksDueToday();
}

getDom.formInputs.forEach((input) => {
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });
});

export {
  closeProjectModule,
  closeTaskModule,
  openProjectModule,
  openTaskModule,
  createTask,
  newProject,
  updateCurrentProject,
  displayTasks,
  displayProjects,
  newTask,
  displayTasksDueToday,
  displayTasksDueThisWeek,
  onLoad,
};
