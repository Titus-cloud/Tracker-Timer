let timerInterval;
let timeLeft = 0;
const timeDisplay = document.getElementById("time-left");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");
const quoteDisplay = document.getElementById("quote");

const alarmSound = new Audio("https://www.soundjay.com/button/beep-07.wav"); // Set the alarm sound

function startTimer() {
  const hours = parseInt(document.getElementById("hours").value) || 0;
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;

  timeLeft = (hours * 3600) + (minutes * 60) + seconds;

  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alarmSound.play();  // Play alarm sound when timer reaches zero
      alert("Time's up! Well done!");  // Optionally, alert the user
      return;
    }
    timeLeft--;
    updateTimeDisplay();
  }, 1000);
}

function updateTimeDisplay() {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  timeDisplay.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  timeLeft = 0;
  updateTimeDisplay();
  clearInterval(timerInterval);
}

async function fetchMotivation() {
  const res = await fetch("https://api.quotable.io/random");
  const data = await res.json();
  quoteDisplay.textContent = `"${data.content}" – ${data.author}`;
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

setInterval(fetchMotivation, 30000);  // Update quote every 30 seconds
fetchMotivation();  // Fetch initial quote
