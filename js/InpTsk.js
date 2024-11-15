document.addEventListener('DOMContentLoaded', function() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskList = document.getElementById('taskList');

  // Loop through tasks and create list items for each task
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.textContent = task.task;  // Display the task name

    // Add click event to show task description
    taskItem.addEventListener('click', () => {
      alert("Description: " + task.description);  // Show description on click
    });

    taskList.appendChild(taskItem);  // Append task to the list
  });
});

// Function to add the task and redirect to the description page
function addTask() {
  const task = document.getElementById('taskInput').value;
  if (task.trim() !== "") {
    // Save the task temporarily (e.g., in localStorage)
    localStorage.setItem('currentTask', task);
    // Redirect to the description page
    window.location.href = 'description.html';
  } else {
    alert("Please enter a task!");
  }
}

// Function to commit the task and description to localStorage
function commitTask() {
  const task = localStorage.getItem('currentTask');  // Get the task saved temporarily
  const description = document.getElementById('taskDescription').value;

  if (description.trim() !== "") {
    // Retrieve existing tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Add the task with description to the array
    const userTask = {
      task: task,  // Saving the task
      description: description,
      createdAt: new Date().toISOString()  // Save the creation time
    };

    // Save updated task list to localStorage
    tasks.push(userTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    alert("Task saved with description!");
    window.location.href = 'tasks.html';  // Redirect back to the tasks page
  } else {
    alert("Please add a description!");
  }
}
