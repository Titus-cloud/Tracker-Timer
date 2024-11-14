// Timer variables and elements
let timerInterval;
let totalTime = 0; // Total time in seconds
let timeRemaining = 0; // Time left in seconds

const timeDisplay = document.querySelector('.time');
const resetButton = document.querySelector('.reset');
const playButton = document.querySelector('.play');
const pauseButton = document.querySelector('.pause');

// Function to update the displayed time
function updateTime() {
  const minutes = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
  const seconds = (timeRemaining % 60).toString().padStart(2, '0');
  timeDisplay.textContent = `${minutes}:${seconds}`;

  if (timeRemaining <= 0 && timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    alert('Congratulations! You completed your session!');
  }
}

// Start the timer countdown
function startTimer() {
  if (timerInterval || timeRemaining <= 0) return; // Prevent multiple intervals
  timerInterval = setInterval(() => {
    timeRemaining--;
    updateTime();
  }, 1000);
}

// Pause the timer
function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

// Reset the timer
function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timeRemaining = totalTime;
  updateTime();
}

// Function to set custom time (e.g., 50 minutes)
function setCustomTime(minutes) {
  totalTime = minutes * 60;
  timeRemaining = totalTime;
  updateTime();
}

// Event listeners for timer controls
playButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Set an initial time (e.g., 50 minutes)
setCustomTime(50);

// Motivational Quotes Functionality
const quoteElement = document.querySelector('.motivation-section blockquote');

async function fetchMotivation() {
  try {
    const response = await fetch('"https://type.fit/api/quotes"');
    const data = await response.json();
    quoteElement.textContent = `"${data.en}" — ${data.author}`;

    setInterval(async () => {
      const newResponse = await fetch('"https://type.fit/api/quotes"');
      const newData = await newResponse.json();
      quoteElement.textContent = `"${newData.en}" — ${newData.author}`;
    }, 30000); // 30 seconds
  } catch (error) {
    quoteElement.textContent = 'Stay positive and keep going!';
  }
}

// fetchMotivation();

// }

// Fetch and display motivational quotes
fetchMotivation();
