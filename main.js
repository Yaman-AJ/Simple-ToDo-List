document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".input");
  const addButton = document.querySelector(".add");
  const clearButton = document.querySelector(".clear");
  const tasksList = document.querySelector(".tasks");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    tasksList.innerHTML = "";
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = `task${task.completed ? " completed" : ""}`;
      li.setAttribute("data-id", task.id);
      li.textContent = task.title;

      const deleteButton = document.createElement("button");
      deleteButton.className = "delete";
      deleteButton.textContent = "Delete";
      li.appendChild(deleteButton);

      tasksList.appendChild(li);
    });
  }

  function addTask(title) {
    if (title.trim()) {
      const task = {
        id: Date.now(),
        title: title.trim(),
        completed: false,
      };
      tasks.push(task);
      saveTasks();
      renderTasks();
    }
  }

  function deleteTask(taskId) {
    tasks = tasks.filter((task) => task.id != taskId);
    saveTasks();
    renderTasks();
  }

  function toggleTaskStatus(taskId) {
    tasks = tasks.map((task) => {
      if (task.id == taskId) {
        task.completed = !task.completed;
      }
      return task;
    });
    saveTasks();
    renderTasks();
  }

  function clearAllTasks() {
    tasks = [];
    saveTasks();
    renderTasks();
  }

  tasksList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      const id = e.target.parentElement.getAttribute("data-id");
      deleteTask(id);
    } else if (e.target.classList.contains("task")) {
      const id = e.target.getAttribute("data-id");
      toggleTaskStatus(id);
    }
  });

  addButton.addEventListener("click", () => {
    addTask(input.value);
    input.value = "";
  });

  clearButton.addEventListener("click", clearAllTasks);

  renderTasks();
});
