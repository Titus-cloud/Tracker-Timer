document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const messageDiv = document.getElementById("message");

  messageDiv.textContent = "";

  // Retrieve all users from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Find user by email
  const user = users.find(u => u.email === email);

  if (!user) {
    // If the email doesn't match any user
    messageDiv.textContent = "Email not found. Please check your email.";
    messageDiv.style.color = "red";
  } else if (user.password !== password) {
    // If the password doesn't match
    messageDiv.textContent = "Incorrect password. Please try again.";
    messageDiv.style.color = "red";
  } else {
    // If both email and password match
    messageDiv.textContent = "Login successful!";
    messageDiv.style.color = "green";

    // Save the logged-in user's email in localStorage for session purposes
    localStorage.setItem("loggedInUser", email);

    setTimeout(() => {
      // Check if a plan was selected in localStorage
      // const selectedPlan = localStorage.getItem('selectedPlan');

      // // Redirect to the correct plan's timer page
      // if (selectedPlan === 'starter') {
      //   window.location.href = './starter-timer.html';
      // } else if (selectedPlan === 'standard') {
      //   window.location.href = './standard-timer.html';
      // } else if (selectedPlan === 'premium') {
      //   window.location.href = './premium-timer.html';
      // } else {
      //   // If no plan is selected, go to the plan selection page
      // }
      window.location.href = './plan.html';
    }, 1500);
  }
});
