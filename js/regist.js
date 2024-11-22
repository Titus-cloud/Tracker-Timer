// DOM Elements
const registrationForm = document.querySelector("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const messageDiv = document.getElementById("message");

/* User structure:
{
  name: '',
  email: '',
  phone: '',
  password: ''
}
*/

// Retrieve users from localStorage or initialize an empty array
const users = JSON.parse(localStorage.getItem("users")) || [];

// Function to check if user already exists
const userExists = (email) => {
  return users.some(user => user.email === email);
};

// Function to add a new user
const addUser = (name, email, phone, password) => {
  users.push({ name, email, phone, password, tasks: [] }); // Initialize tasks for the user
  localStorage.setItem("users", JSON.stringify(users));
};

// Function to display messages
const showMessage = (text, color = "red") => {
  messageDiv.textContent = text;
  messageDiv.style.color = color;
  messageDiv.style.display = "block";
};

// Registration form submission
registrationForm.onsubmit = (e) => {
  e.preventDefault();
  messageDiv.textContent = "";

  if (passwordInput.value !== confirmPasswordInput.value) {
    showMessage("Passwords do not match. Please try again.");
    return;
  }

  const email = emailInput.value.trim();
  if (userExists(email)) {
    showMessage("User already exists. Please log in.", "orange"); // Color for an existing user message
    return;
  }

  addUser(
    nameInput.value.trim(),
    email,
    phoneInput.value.trim(),
    passwordInput.value
  );

  // Clear form inputs
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  passwordInput.value = "";
  confirmPasswordInput.value = "";

  showMessage("Registration successful!", "green");
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
};
