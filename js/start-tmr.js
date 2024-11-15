// Timer variables and elements
let timerInterval;
let totalTime = 0; // Total time in seconds
let timeRemaining = 0; // Time left in seconds

const timeDisplay = document.querySelector('.time');
const resetButton = document.querySelector('.reset');
const playButton = document.querySelector('.play');
const pauseButton = document.querySelector('.pause');

// Retrieve the current user (from localStorage)
const currentUser = localStorage.getItem('loggedInUser');

if (!currentUser) {
  alert("Please log in first!");
  // Redirect to login page or take appropriate action
}

// Function to update the displayed time
function updateTime() {
  const minutes = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
  const seconds = (timeRemaining % 60).toString().padStart(2, '0');
  timeDisplay.textContent = `${minutes}:${seconds}`;

  if (timeRemaining <= 0 && timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    alert('Congratulations! You completed your session!');
    // Save the completed session state
    saveTimerState();
  }
}

// Start the timer countdown
function startTimer() {
  if (timerInterval || timeRemaining <= 0) return; // Prevent multiple intervals
  timerInterval = setInterval(() => {
    timeRemaining--;
    updateTime();
    // Save the timer state on every tick
    saveTimerState();
  }, 1000);
}

// Pause the timer
function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  // Save the paused state
  saveTimerState();
}

// Reset the timer
function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timeRemaining = totalTime;
  updateTime();
  // Save the reset state
  saveTimerState();
}

// Function to set custom time (e.g., 50 minutes)
function setCustomTime(minutes) {
  totalTime = minutes * 60;
  timeRemaining = totalTime;
  updateTime();
  // Save the custom time set
  saveTimerState();
}

// Function to save the timer state to localStorage
function saveTimerState() {
  if (currentUser) {
    const timerState = {
      totalTime,
      timeRemaining,
      timerIntervalRunning: !!timerInterval,
    };

    localStorage.setItem(`timerState_${currentUser}`, JSON.stringify(timerState));
  }
}

// Function to load the timer state from localStorage
function loadTimerState() {
  if (currentUser) {
    const savedState = JSON.parse(localStorage.getItem(`timerState_${currentUser}`));

    if (savedState) {
      totalTime = savedState.totalTime;
      timeRemaining = savedState.timeRemaining;
      updateTime();

      if (savedState.timerIntervalRunning) {
        startTimer();
      }
    }
  }
}

// Event listeners for timer controls
playButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Set an initial time (e.g., 50 minutes)
setCustomTime(60);

// Load the saved timer state if available
loadTimerState();

// Motivational Quotes Functionality
const quoteElement = document.querySelector('.motivation-section blockquote');

async function fetchMotivation() {
  try {
    const response = await fetch("https://type.fit/api/quotes");
    const data = await response.json();
    quoteElement.textContent = `"${data[0].text}" — ${data[0].author}`;

    setInterval(async () => {
      const newResponse = await fetch("https://type.fit/api/quotes");
      const newData = await newResponse.json();
      quoteElement.textContent = `"${newData[0].text}" — ${newData[0].author}`;
    }, 30000); // 30 seconds
  } catch (error) {
    quoteElement.textContent = 'Stay positive and keep going!';
  }
}

// Fetch and display motivational quotes
fetchMotivation();
