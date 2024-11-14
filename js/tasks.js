// Function to commit the task with description and save to localStorage
function commitTask() {
  const description = document.getElementById('taskDescription').value.trim();

  if (description) {
    // Retrieve tasks from localStorage or initialize an empty array
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Create a new task object
    const newTask = {
      id: Date.now(), // Unique ID for each task
      description: description,
    };

    // Add the new task to the tasks array
    tasks.push(newTask);

    // Save the updated tasks array to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Clear the input and update the task list
    document.getElementById('taskDescription').value = '';
    displayTasks();
  } else {
    alert('Please enter a description!');
  }
}

// Function to display tasks in the task list
function displayTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = ''; // Clear the list before adding tasks

  // Retrieve tasks from localStorage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Loop through tasks and create list items
  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.textContent = task.description;

    // Create a delete button for each task
    const deleteButton = document.createElement('a');
    deleteButton.href = '#';
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTask(task.id);

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
  });
}

// Function to delete a task
function deleteTask(taskId) {
  // Retrieve tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Filter out the task with the given ID
  tasks = tasks.filter(task => task.id !== taskId);

  // Save the updated tasks array to localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Update the task list
  displayTasks();
}

// Initial call to display tasks on page load
window.onload = displayTasks;
