let screenTime = 0;
let youtubeTime = 0;
let gameTime = 0;
let monitoring = true;

// simulate 1 minute = 1 second (for demo)
setInterval(() => {
  if (monitoring) {
    screenTime++;
    document.getElementById("status").innerText =
      `Screen Time: ${screenTime} minutes`;

    // 30 min detection (app-wise)
    if (youtubeTime >= 30 || gameTime >= 30) {
      console.log("App-wise overuse detected");
    }

    // 60 min full lock
    if (screenTime === 60) {
      triggerLock();
    }
  }
}, 1000);

function useApp(app) {
  if (!monitoring) return;

  if (app === "youtube") youtubeTime++;
  if (app === "games") gameTime++;

  alert(`Using ${app}`);
}

function triggerLock() {
  monitoring = false;
  document.getElementById("alertScreen").style.display = "block";
  startBreakTimer(10); // 10 min break (demo)
}

function startBreakTimer(minutes) {
  let time = minutes * 60;

  let interval = setInterval(() => {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    document.getElementById("breakTimer").innerText =
      `Break Time: ${min}:${sec < 10 ? '0' : ''}${sec}`;

    time--;

    if (time < 0) {
      clearInterval(interval);
      document.getElementById("alertScreen").innerHTML =
        "<h1>✅ Break Completed</h1><p>You can resume healthy usage now.</p>";
    }
  }, 1000);
}

function showActivity(type) {
  let text = "";

  if (type === "meditate") {
    text = "Close your eyes. Breathe slowly for 1 minute 🧘";
  } else {
    text = "Do 10 jumping jacks or stretch your arms 💪";
  }

  document.getElementById("activityText").innerText = text;
}


let isOnBreak = false;

function startBreak() {
  isOnBreak = true;

  // show break message
  document.getElementById("breakScreen").style.display = "block";

  // show resume button
  document.getElementById("resumeBtn").style.display = "block";
}

document.getElementById("resumeBtn").addEventListener("click", () => {
  isOnBreak = false;

  // hide break screen
  document.getElementById("breakScreen").style.display = "none";

  // hide resume button
  document.getElementById("resumeBtn").style.display = "none";

  // go back to focus state
  resumeFocus();
});

function resumeFocus() {
  // continue monitoring / timer again
  startMonitoring(); // or startTimer()
}
