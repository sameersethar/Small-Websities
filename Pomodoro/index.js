
var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");
var resetButton = document.getElementById("reset");
var timerDisplay = document.getElementById("timer");
var timerInterval;
var totalTimeInSeconds = 3000;
var timerIsRunning = false;
var alarmAudio = new Audio("bell.mp3");

function showTime() {
  var minutes = Math.floor(totalTimeInSeconds / 60);
  var seconds = totalTimeInSeconds % 60;
  var timeString = minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
  timerDisplay.textContent = timeString;
}
function startTimer() {
  if (timerIsRunning) return;
  timerIsRunning = true;
  timerInterval = setInterval(function () {
    if (totalTimeInSeconds > 0) {
      totalTimeInSeconds = totalTimeInSeconds - 1;
      showTime();
    } else {
      clearInterval(timerInterval);
      timerIsRunning = false;
      alarmAudio.play().catch(() => {});
      alert("Time's up!");
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerIsRunning = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  totalTimeInSeconds = 3000;
  showTime();
  timerIsRunning = false;
  alarmAudio.pause();
  alarmAudio.currentTime = 0;
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
showTime(); 

var soundFiles = {
  original: "sounds/original.mp3",
  lofi: "sounds/lofi.mp3",
  library: "sounds/library.mp3",
  rain: "sounds/rain.mp3",
  nature: "sounds/nature.mp3",
  fireplace: "sounds/fireplace.mp3"
};


var audioElements = {};
var soundsUnlocked = false;

for (var key in soundFiles) {
  var audio = new Audio(soundFiles[key]);
  audio.loop = true;
  audio.volume = 0;
  audioElements[key] = audio;
}

document.addEventListener("click", function () {
  if (!soundsUnlocked) {
    for (var key in audioElements) {
      audioElements[key].play().catch(function () {});
    }
    soundsUnlocked = true;
  }
});

var sliders = document.querySelectorAll('input[type="range"]');

for (var i = 0; i < sliders.length; i++) {
  var slider = sliders[i];
  slider.min = 0;
  slider.max = 1;
  slider.step = 0.01;
  slider.value = 0;

  slider.addEventListener("input", function (event) {
    var soundKey = event.target.getAttribute("data-sound");
    var volume = parseFloat(event.target.value);
    var audio = audioElements[soundKey];

    if (audio) {
      audio.volume = volume;
      if (volume > 0 && audio.paused) {
        audio.play();
      } else if (volume === 0) {
        audio.pause();
      }
    }

    // Optional visual style for slider (simple gradient)
    var percent = (event.target.value - event.target.min) / (event.target.max - event.target.min) * 100;
    event.target.style.background = "linear-gradient(to right, #4facfe 0%, #00f2fe " + percent + "%, #ccc " + percent + "%)";
  });
}

var fullscreenButton = document.getElementById("fullscreen");
var fullscreenWrapper = document.getElementById("fullscreen-wrapper");
var mainLayout = document.querySelector(".main-layout");
var soundPanel = document.querySelector(".sound-panel");

fullscreenButton.addEventListener("click", function () {
  if (!document.fullscreenElement) {
    fullscreenWrapper.requestFullscreen().then(function () {
      fullscreenWrapper.classList.add("fullscreen-mode");
      soundPanel.style.display = "none";
      mainLayout.style.justifyContent = "center";
    });
  } else {
    document.exitFullscreen().then(function () {
      fullscreenWrapper.classList.remove("fullscreen-mode");
      soundPanel.style.display = "block";
      mainLayout.style.justifyContent = "center"; // adjust if needed
    });
  }
});
