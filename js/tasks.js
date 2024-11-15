// Function to handle task submission and redirection
function addTask() {
  const taskInput = document.getElementById("taskInput").value.trim();
  const taskDescription = document.getElementById("taskDescription").value.trim();
  const message = document.getElementById("message");

  // Get the current user
  const currentUser = localStorage.getItem("loggedInUser");

  if (!currentUser) {
    alert("Please log in first!");
    return;
  }

  if (taskInput && taskDescription) {
    // Create a task object
    const task = {
      name: taskInput,
      description: taskDescription,
      createdAt: new Date().toISOString(),
    };

    // Retrieve existing tasks for the current user
    const tasksKey = `tasks_${currentUser}`;
    const tasks = JSON.parse(localStorage.getItem(tasksKey)) || [];
    tasks.push(task);

    // Save tasks back to localStorage
    localStorage.setItem(tasksKey, JSON.stringify(tasks));

    // Display success message
    message.textContent = "Task saved successfully!";
    message.classList.add("success");
    setTimeout(() => {
      message.textContent = "";
      message.classList.remove("success");

      // Redirect based on the selected plan
      redirectToTimerPage(task); // Pass the task to determine the timer page
    }, 2000);

    // Clear input fields
    document.getElementById("taskInput").value = "";
    document.getElementById("taskDescription").value = "";

    // Update the task list on the screen
    displayTasks();
  } else {
    message.textContent = "Please fill in both fields!";
    message.classList.add("error");
    setTimeout(() => {
      message.textContent = "";
      message.classList.remove("error");
    }, 2000);
  }
}

// Function to display tasks
function displayTasks() {
  const currentUser = localStorage.getItem("loggedInUser");
  const tasksKey = `tasks_${currentUser}`;
  const tasks = JSON.parse(localStorage.getItem(tasksKey)) || [];
  const taskList = document.getElementById("taskList");

  // Clear the task list before re-rendering
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    // Create task content
    const taskContent = document.createElement("div");
    taskContent.classList.add("task-content");
    taskContent.innerHTML = `
      <strong>${task.name}</strong>
    `;

    // Make the task item clickable to redirect to the timer page
    taskItem.addEventListener("click", () => redirectToTimerPage(task));

    // Create a "View Description" button
    const viewBtn = document.createElement("button");
    viewBtn.textContent = "View";
    viewBtn.classList.add("view-btn");
    viewBtn.addEventListener("click", () => showDescription(task, taskItem));

    // Create a delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => deleteTask(index));

    // Append the content, view button, and delete button to the task item
    taskItem.appendChild(taskContent);
    taskItem.appendChild(viewBtn);
    taskItem.appendChild(deleteBtn);

    // Append task item to the list
    taskList.appendChild(taskItem);
  });
}

// Function to redirect to the timer page based on task
function redirectToTimerPage(task) {
  const selectedPlan = localStorage.getItem("selectedPlan");
  let timerPage = '';

  // Determine which timer page to redirect to based on the plan
  if (selectedPlan === 'starter') {
    timerPage = "starter-timer.html";
  } else if (selectedPlan === 'standard') {
    timerPage = "stndd-tmr.html";
  } else if (selectedPlan === 'premium') {
    timerPage = "prem.html";
  }

  // Store the task data in localStorage for use on the timer page
  localStorage.setItem('currentTask', JSON.stringify(task));

  // Redirect to the respective timer page
  window.location.href = timerPage;
}

// Function to show the description under the task
function showDescription(task, taskItem) {
  // Check if the description is already shown
  if (taskItem.querySelector(".task-description")) {
    // If already shown, remove the description
    taskItem.querySelector(".task-description").remove();
  } else {
    // Create a new div for the description
    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("task-description");
    descriptionDiv.textContent = task.description;

    // Append the description to the task item
    taskItem.appendChild(descriptionDiv);
  }
}

// Function to delete a task
function deleteTask(index) {
  const currentUser = localStorage.getItem("loggedInUser");
  const tasksKey = `tasks_${currentUser}`;
  const tasks = JSON.parse(localStorage.getItem(tasksKey)) || [];

  // Remove the task from the array
  tasks.splice(index, 1);

  // Save the updated tasks array back to localStorage
  localStorage.setItem(tasksKey, JSON.stringify(tasks));

  // Re-display the tasks
  displayTasks();
}

// Initial call to display tasks when the page loads
displayTasks();
