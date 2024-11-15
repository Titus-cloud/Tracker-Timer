document.addEventListener('DOMContentLoaded', function () {
  let timer;
  let countdown;
  let timeLeft;
  let isRunning = false;
  let endTime;
  const datePicker = document.querySelector('.date-picker');
  const countdownDisplay = document.querySelector('.countdown');
  const startButton = document.querySelector('.start');
  const pauseButton = document.querySelector('.pause');
  const resetButton = document.querySelector('.reset');
  const themeToggle = document.querySelector('.theme-toggle');
  const newQuoteButton = document.querySelector('.new-quote');
  const quoteDisplay = document.querySelector('.quote');
  
  // Audio for alarm
  const alarmAudio = new Audio('alarm-sound.mp3'); // Path to your audio file

  // Theme Toggle
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
  });

  // Start Timer
  startButton.addEventListener('click', () => {
    if (!isRunning) {
      endTime = new Date(datePicker.value).getTime();
      if (isNaN(endTime)) {
        alert('Please set a valid deadline.');
        return;
      }
      startTimer();
    }
  });

  // Pause Timer
  pauseButton.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
  });

  // Reset Timer
  resetButton.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    countdownDisplay.textContent = '00:00:00';
  });

  // New Quote
  newQuoteButton.addEventListener('click', fetchMotivation);

  // Start the countdown
  function startTimer() {
    isRunning = true;
    timer = setInterval(updateTimer, 1000);
  }

  // Update Timer
  function updateTimer() {
    const now = new Date().getTime();
    timeLeft = endTime - now;

    if (timeLeft <= 0) {
      clearInterval(timer);
      countdownDisplay.textContent = '00:00:00';
      alarmAudio.play();  // Play the alarm sound when the timer hits zero
      alert("Congratulations! Your time has ended!"); // Optional alert for visual feedback
    } else {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24)); // Calculate remaining days
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Calculate hours
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)); // Calculate minutes
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000); // Calculate seconds
      countdownDisplay.textContent = `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
    }
  }

  // Format Time
  function pad(num) {
    return num < 10 ? `0${num}` : num;
  }

  // Fetch Motivational Quote
  // async function fetchMotivation() {
  //   const response = await fetch("https://api.quotable.io/random");
  //   if (response.ok) {
  //     const data = await response.json();
  //     quoteDisplay.textContent = `"${data.content}" — ${data.author}`;
  //   } else {
  //     quoteDisplay.textContent = "Failed to load quote. Try again!";
  //   }
  // }

  // // Initial Quote Load
  // fetchMotivation();

  // Set Day from Deadline Date
  datePicker.addEventListener('input', function () {
    const selectedDate = new Date(datePicker.value);
    const day = selectedDate.toLocaleString('en-US', { weekday: 'long' });
    document.querySelector('.day-name').textContent = day;
  });
});
