// Load tasks on page load
window.onload = function() {
  displayTasks();
};

// Add a new task
function addTask() {
  const taskInput = document.getElementById('taskInput').value.trim();
  const priority = document.getElementById('priority').value;
  const deadline = document.getElementById('deadline').value;

  if (!taskInput || !deadline) {
    displayMessage("Please fill in both the task and deadline!", 20000);
    return;
  }

  const task = {
    taskInput,
    priority,
    deadline,
    completed: false
  };

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  displayMessage("Task added successfully!", 20000);
  displayTasks();
  clearInputs();
}

// Display tasks
function displayTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = "";

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach((task, index) => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    
    taskItem.innerHTML = `
      <div>
        <strong>${task.taskInput}</strong> - ${task.priority} - Deadline: ${task.deadline}
      </div>
      <button class="mark-done" onclick="markDone(${index})">Mark Done</button>
    `;
    
    taskList.appendChild(taskItem);
  });
}

// Mark task as done
function markDone(index) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.splice(index, 1); // Remove the task
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks();
}

// Clear input fields
function clearInputs() {
  document.getElementById('taskInput').value = "";
  document.getElementById('deadline').value = "";
}

// Display a message for a set duration
function displayMessage(message, duration) {
  const messageBox = document.createElement('div');
  messageBox.innerText = message;
  messageBox.style.backgroundColor = "#000";
  messageBox.style.color = "#fff";
  messageBox.style.padding = "10px";
  messageBox.style.position = "fixed";
  messageBox.style.top = "10px";
  messageBox.style.right = "10px";
  messageBox.style.borderRadius = "5px";

  document.body.appendChild(messageBox);

  setTimeout(() => {
    document.body.removeChild(messageBox);
  }, 5000);
}
