// Step 1 - Access the HTML elements
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const priorityInput = document.querySelector("#priority");
const taskList = document.querySelector("#task-list");
const errorMessage = document.querySelector("#error-message");

// Step 2 - Store tasks in an array.
// Each task is an object with a name, priority, and completion status.
const tasks = [];

// A simple counter so every task gets a unique id.
// This makes it easy to find the right task later when
// the user clicks Complete or Delete.
let nextId = 1;

// Step 3 - Respond to form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskName = taskInput.value.trim();
  const taskPriority = priorityInput.value;

  // Do not create a task if the name is empty.
  if (taskName === "") {
    errorMessage.classList.remove("hidden");
    return;
  }

  errorMessage.classList.add("hidden");

  // Step 4 - Add the task
  const task = {
    id: nextId,
    name: taskName,
    priority: taskPriority,
    completed: false
  };

  nextId++;
  tasks.push(task);

  // Clear the input so the user can type the next task.
  taskInput.value = "";
  taskInput.focus();

  displayTasks();
});

// Step 5 - Display tasks
function displayTasks() {
  // Clear whatever is currently on the page and rebuild it
  // from the tasks array. This keeps the display and the
  // array in sync at all times.
  taskList.innerHTML = "";

  tasks.forEach(function (task) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    if (task.completed) {
      taskElement.classList.add("completed");
    }

    const infoElement = document.createElement("div");
    infoElement.classList.add("task-info");

    const nameSpan = document.createElement("span");
    nameSpan.classList.add("task-name");
    nameSpan.textContent = task.name;

    const prioritySpan = document.createElement("span");
    prioritySpan.classList.add("task-priority", "priority-" + task.priority);
    prioritySpan.textContent = task.priority;

    infoElement.appendChild(nameSpan);
    infoElement.appendChild(prioritySpan);

    const buttonsElement = document.createElement("div");
    buttonsElement.classList.add("task-buttons");

    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-btn");
    completeButton.textContent = task.completed ? "Undo" : "Complete";
    completeButton.addEventListener("click", function () {
      toggleComplete(task.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      deleteTask(task.id);
    });

    buttonsElement.appendChild(completeButton);
    buttonsElement.appendChild(deleteButton);

    taskElement.appendChild(infoElement);
    taskElement.appendChild(buttonsElement);

    taskList.appendChild(taskElement);
  });
}

// Step 6 - Complete a task
// Toggles a task between completed and incomplete.
function toggleComplete(id) {
  const task = tasks.find(function (t) {
    return t.id === id;
  });

  if (task) {
    task.completed = !task.completed;
    displayTasks();
  }
}

// Step 7 - Delete a task
function deleteTask(id) {
  const index = tasks.findIndex(function (t) {
    return t.id === id;
  });

  if (index !== -1) {
    tasks.splice(index, 1);
    displayTasks();
  }
}
