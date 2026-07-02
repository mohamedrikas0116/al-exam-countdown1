/* ==========================================================
   A/L Exam Countdown
   File: js/studyTimer.js
   Study Timer Module (Subject Tracking)
========================================================== */

"use strict";

/* ==========================================================
   State
========================================================== */

let studyInterval = null;

let isStudyRunning = false;

let studySeconds = 0;

let activeSubject = "Other";

/* ==========================================================
   Initialize
========================================================== */

function initializeStudyTimer() {

    loadStudySession();

    bindStudyEvents();

    updateStudyDisplay();

}

/* ==========================================================
   Load Saved Session
========================================================== */

function loadStudySession() {

    studySeconds = Number(localStorage.getItem("studySeconds")) || 0;

    activeSubject = localStorage.getItem("activeSubject") || "Other";

    const subjectSelect = document.getElementById("subject");

    if (subjectSelect) {

        subjectSelect.value = activeSubject;

        subjectSelect.addEventListener("change", (e) => {

            activeSubject = e.target.value;

            localStorage.setItem("activeSubject", activeSubject);

        });

    }

}

/* ==========================================================
   Bind Buttons
========================================================== */

function bindStudyEvents() {

    const startBtn = document.getElementById("studyStart");
    const pauseBtn = document.getElementById("studyPause");
    const resetBtn = document.getElementById("studyReset");

    if (startBtn) startBtn.onclick = startStudy;
    if (pauseBtn) pauseBtn.onclick = pauseStudy;
    if (resetBtn) resetStudy;

}

/* ==========================================================
   Start Study Timer
========================================================== */

function startStudy() {

    if (isStudyRunning) return;

    isStudyRunning = true;

    studyInterval = setInterval(() => {

        studySeconds++;

        updateStudyDisplay();

        saveStudyData();

        updateTodayStudyMinutes();

    }, 1000);

    setStudyStatus("Studying 📖");

}

/* ==========================================================
   Pause Study Timer
========================================================== */

function pauseStudy() {

    isStudyRunning = false;

    clearInterval(studyInterval);

    setStudyStatus("Paused ⏸");

}

/* ==========================================================
   Reset Study Timer
========================================================== */

function resetStudy() {

    pauseStudy();

    studySeconds = 0;

    updateStudyDisplay();

    saveStudyData();

    setStudyStatus("Reset 🔄");

}

/* ==========================================================
   Update Display
========================================================== */

function updateStudyDisplay() {

    const display = document.getElementById("studyDisplay");

    if (!display) return;

    const hrs = Math.floor(studySeconds / 3600);

    const mins = Math.floor((studySeconds % 3600) / 60);

    const secs = studySeconds % 60;

    display.textContent =
        `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;

}

/* ==========================================================
   Save Study Data
========================================================== */

function saveStudyData() {

    localStorage.setItem("studySeconds", studySeconds);

    localStorage.setItem("activeSubject", activeSubject);

}

/* ==========================================================
   Update Dashboard Minutes
========================================================== */

function updateTodayStudyMinutes() {

    const current = Number(localStorage.getItem("todayStudy")) || 0;

    const newMinutes = Math.floor(studySeconds / 60);

    localStorage.setItem("todayStudy", current + 0.016); 
    // approx incremental tracking

}

/* ==========================================================
   Status UI
========================================================== */

function setStudyStatus(text) {

    let status = document.querySelector("#study .timer-status");

    if (!status) {

        status = document.createElement("div");

        status.className = "timer-status";

        const section = document.getElementById("study");

        if (section) section.appendChild(status);

    }

    status.textContent = text;

}

/* ==========================================================
   Helper
========================================================== */

function pad(num) {

    return String(num).padStart(2, "0");

}

/* ==========================================================
   External Controls
========================================================== */

function toggleStudyTimer() {

    if (isStudyRunning) {

        pauseStudy();

    } else {

        startStudy();

    }

}

/* ==========================================================
   Analytics Hook (optional)
========================================================== */

function getStudyStats() {

    return {

        totalSeconds: studySeconds,

        subject: activeSubject,

        formatted: `${pad(Math.floor(studySeconds/3600))}:${pad(Math.floor((studySeconds%3600)/60))}:${pad(studySeconds%60))}`

    };

}

/* ==========================================================
   Export
========================================================== */

window.initializeStudyTimer = initializeStudyTimer;
window.toggleStudyTimer = toggleStudyTimer;
window.getStudyStats = getStudyStats;
window.startStudy = startStudy;
window.pauseStudy = pauseStudy;
window.resetStudy = resetStudy;

