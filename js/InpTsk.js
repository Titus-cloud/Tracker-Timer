function addTask() {
  const task = document.getElementById('taskInput').value;
  if (task.trim() !== "") {
    // Save the task temporarily (e.g., in sessionStorage)
    sessionStorage.setItem('currentTask', task);
    // Redirect to the description page
    window.location.href = 'description.html';
  } else {
    alert("Please enter a task!");
  }
}

function saveTask() {
  const task = sessionStorage.getItem('currentTask');
  const description = document.getElementById('taskDescription').value;

  if (description.trim() !== "") {
    // Retrieve existing tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const userTask = {
      task: task,
      description: description,
      createdAt: new Date().toISOString()
    };
    // Add the new task and save it to localStorage
    tasks.push(userTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    alert("Task saved successfully!");
    // Redirect to a main tasks page or reset input
    window.location.href = 'tasks.html'; // Adjust as needed
  } else {
    alert("Please enter a description!");
  }
}
