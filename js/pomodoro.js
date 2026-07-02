/* ==========================================================
   A/L Exam Countdown
   File: js/pomodoro.js
   Pomodoro Timer Module
========================================================== */

"use strict";

/* ==========================================================
   State
========================================================== */

let pomodoroInterval = null;

let isRunning = false;

let isBreak = false;

let pomodoroTime = 25 * 60; // default 25 minutes

let breakTime = 5 * 60;

let currentTime = pomodoroTime;

/* ==========================================================
   Initialize
========================================================== */

function initializePomodoro() {

    loadPomodoroUI();

    updatePomodoroDisplay();

    bindPomodoroEvents();

}

/* ==========================================================
   UI Bindings
========================================================== */

function loadPomodoroUI() {

    const display = document.getElementById("pomodoroDisplay");

    if (display) {

        display.textContent = formatTime(currentTime);

    }

}

/* ==========================================================
   Event Listeners
========================================================== */

function bindPomodoroEvents() {

    const startBtn = document.getElementById("startPomodoro");
    const pauseBtn = document.getElementById("pausePomodoro");
    const resetBtn = document.getElementById("resetPomodoro");

    if (startBtn) startBtn.onclick = startPomodoro;
    if (pauseBtn) pauseBtn.onclick = pausePomodoro;
    if (resetBtn) resetBtn.onclick = resetPomodoro;

    document.querySelectorAll(".modes button").forEach(btn => {

        btn.addEventListener("click", () => {

            const mode = btn.dataset.mode;

            setMode(mode);

        });

    });

}

/* ==========================================================
   Start Pomodoro
========================================================== */

function startPomodoro() {

    if (isRunning) return;

    isRunning = true;

    pomodoroInterval = setInterval(() => {

        currentTime--;

        updatePomodoroDisplay();

        if (currentTime <= 0) {

            handleSessionEnd();

        }

    }, 1000);

    setStatus("Focus Time 🍅");

}

/* ==========================================================
   Pause Pomodoro
========================================================== */

function pausePomodoro() {

    isRunning = false;

    clearInterval(pomodoroInterval);

    setStatus("Paused ⏸");

}

/* ==========================================================
   Reset Pomodoro
========================================================== */

function resetPomodoro() {

    pausePomodoro();

    currentTime = isBreak ? breakTime : pomodoroTime;

    updatePomodoroDisplay();

    setStatus("Reset 🔄");

}

/* ==========================================================
   Session End Handler
========================================================== */

function handleSessionEnd() {

    clearInterval(pomodoroInterval);

    isRunning = false;

    playAlarm();

    isBreak = !isBreak;

    currentTime = isBreak ? breakTime : pomodoroTime;

    updatePomodoroDisplay();

    setStatus(isBreak ? "Break Time ☕" : "Focus Time 🍅");

    showNotification(
        isBreak
            ? "Take a short break ☕"
            : "Back to focus 🍅"
    );

}

/* ==========================================================
   Update Display
========================================================== */

function updatePomodoroDisplay() {

    const display = document.getElementById("pomodoroDisplay");

    if (!display) return;

    display.textContent = formatTime(currentTime);

    display.classList.add("timer-running");

    setTimeout(() => {

        display.classList.remove("timer-running");

    }, 500);

}

/* ==========================================================
   Set Mode (25/5, 50/10, custom)
========================================================== */

function setMode(mode) {

    pausePomodoro();

    if (mode === "25") {

        pomodoroTime = 25 * 60;
        breakTime = 5 * 60;

    } else if (mode === "50") {

        pomodoroTime = 50 * 60;
        breakTime = 10 * 60;

    } else if (mode === "custom") {

        const focus = prompt("Enter focus minutes:", 25);
        const breakMin = prompt("Enter break minutes:", 5);

        pomodoroTime = (parseInt(focus) || 25) * 60;
        breakTime = (parseInt(breakMin) || 5) * 60;

    }

    isBreak = false;
    currentTime = pomodoroTime;

    updatePomodoroDisplay();

    highlightMode(mode);

}

/* ==========================================================
   UI Helpers
========================================================== */

function highlightMode(mode) {

    document.querySelectorAll(".modes button").forEach(btn => {

        btn.classList.toggle("active", btn.dataset.mode === mode);

    });

}

/* ==========================================================
   Status
========================================================== */

function setStatus(text) {

    let status = document.querySelector(".timer-status");

    if (!status) {

        status = document.createElement("div");

        status.className = "timer-status";

        const pomodoroSection = document.getElementById("pomodoro");

        if (pomodoroSection) {

            pomodoroSection.appendChild(status);

        }

    }

    status.textContent = text;

}

/* ==========================================================
   External Controls
========================================================== */

function togglePomodoro() {

    if (isRunning) {

        pausePomodoro();

    } else {

        startPomodoro();

    }

}

/* ==========================================================
   Utility
========================================================== */

function getPomodoroState() {

    return {

        isRunning,

        isBreak,

        currentTime,

        pomodoroTime,

        breakTime

    };

}

/* ==========================================================
   Export
========================================================== */

window.initializePomodoro = initializePomodoro;
window.togglePomodoro = togglePomodoro;
window.getPomodoroState = getPomodoroState;
window.startPomodoro = startPomodoro;
window.pausePomodoro = pausePomodoro;
window.resetPomodoro = resetPomodoro;

