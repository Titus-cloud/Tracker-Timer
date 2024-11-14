// Function to generate a unique user ID if not already present in localStorage
function getUserID() {
  let userID = localStorage.getItem('userID');
  if (!userID) {
    // Generate a new unique ID (could be improved with more randomness)
    userID = 'user-' + Date.now();
    localStorage.setItem('userID', userID);
  }
  return userID;
}

// Function to record user actions in localStorage
function recordAction(actionType, details) {
  const userID = getUserID();
  const timestamp = new Date().toISOString();

  // Create the action record
  const actionRecord = {
    userID: userID,
    actionType: actionType,
    details: details,
    timestamp: timestamp
  };

  // Get all previous actions, or initialize an empty array if none exist
  let actions = JSON.parse(localStorage.getItem('userActions')) || [];

  // Add the new action to the actions list
  actions.push(actionRecord);

  // Save updated actions back to localStorage
  localStorage.setItem('userActions', JSON.stringify(actions));
}

// Function to capture when a user selects a plan
function selectPlan(planName, price, features) {
  const details = {
    planName: planName,
    price: price,
    features: features
  };

  // Record the plan selection action
  recordAction('Plan Selected', details);

  // Optionally, redirect the user after selecting a plan (can be adjusted as needed)
  // For now, we simply log the action to show it's been recorded
  console.log(`User selected the ${planName}. Details: `, details);

  // Redirect to another page if needed (you can customize the redirection URL as needed)
  // Example: window.location.href = 'next-page.html';
}
