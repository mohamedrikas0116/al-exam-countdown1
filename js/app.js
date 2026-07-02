/* ==========================================================
   A/L Exam Countdown
   File: js/app.js
   Main Application Controller
========================================================== */

"use strict";

/* ==========================================================
   Global App Object
========================================================== */

const App = {

    version: "1.0.0",

    examDate: new Date("2026-11-23T08:00:00"),

    initialized: false

};

/* ==========================================================
   DOM Ready
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeApp();

});

/* ==========================================================
   Initialize Application
========================================================== */

function initializeApp() {

    console.log("📚 A/L Exam Countdown Started");

    App.initialized = true;

    loadSavedTheme();

    loadSavedTasks();

    loadStudyStatistics();

    initializeCountdown();

    initializePomodoro();

    initializeStudyTimer();

    initializeCalendar();

    initializeQuotes();

    initializeAnalytics();

    initializeNotifications();

    registerKeyboardShortcuts();

    updateDashboard();

    startClock();

}

/* ==========================================================
   Live Dashboard Updates
========================================================== */

function startClock() {

    setInterval(() => {

        updateDashboard();

    }, 1000);

}

/* ==========================================================
   Dashboard
========================================================== */

function updateDashboard() {

    updateTodayStudy();

    updateCompletedTasks();

    updateStreak();

    updateFocusScore();

}

/* ==========================================================
   Today's Study
========================================================== */

function updateTodayStudy() {

    const minutes = Number(localStorage.getItem("todayStudy")) || 0;

    const hours = Math.floor(minutes / 60);

    const mins = minutes % 60;

    const display = document.getElementById("todayStudy");

    if (!display) return;

    display.textContent =
        `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;

}

/* ==========================================================
   Completed Tasks
========================================================== */

function updateCompletedTasks() {

    const completed =
        Number(localStorage.getItem("completedTasks")) || 0;

    const element = document.getElementById("completedTasks");

    if (element) {

        element.textContent = completed;

    }

}

/* ==========================================================
   Study Streak
========================================================== */

function updateStreak() {

    const streak =
        Number(localStorage.getItem("studyStreak")) || 0;

    const element = document.getElementById("streak");

    if (element) {

        element.textContent = `${streak} Days`;

    }

}

/* ==========================================================
   Focus Score
========================================================== */

function updateFocusScore() {

    const focus =
        Number(localStorage.getItem("focusScore")) || 100;

    const element = document.getElementById("focusScore");

    if (element) {

        element.textContent = `${focus}%`;

    }

}

/* ==========================================================
   Keyboard Shortcuts
========================================================== */

function registerKeyboardShortcuts() {

    document.addEventListener("keydown", event => {

        /* Space = Pomodoro Start/Pause */

        if (
            event.code === "Space" &&
            document.activeElement.tagName !== "INPUT"
        ) {

            event.preventDefault();

            if (typeof togglePomodoro === "function") {

                togglePomodoro();

            }

        }

        /* T = Theme */

        if (event.key.toLowerCase() === "t") {

            if (typeof toggleTheme === "function") {

                toggleTheme();

            }

        }

        /* S = Study Timer */

        if (event.key.toLowerCase() === "s") {

            if (typeof toggleStudyTimer === "function") {

                toggleStudyTimer();

            }

        }

    });

}

/* ==========================================================
   Welcome Message
========================================================== */

window.addEventListener("load", () => {

    console.log(
        "%cWelcome to A/L Study Dashboard",
        "color:#2563eb;font-size:18px;font-weight:bold;"
    );

});

/* ==========================================================
   Online / Offline
========================================================== */

window.addEventListener("online", () => {

    showToast("🌐 You're back online.");

});

window.addEventListener("offline", () => {

    showToast("📴 Offline Mode Enabled");

});

/* ==========================================================
   Toast
========================================================== */

function showToast(message) {

    let toast = document.getElementById("toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "toast";

        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.right = "20px";
        toast.style.background = "#2563eb";
        toast.style.color = "#fff";
        toast.style.padding = "14px 22px";
        toast.style.borderRadius = "12px";
        toast.style.boxShadow = "0 10px 25px rgba(0,0,0,.2)";
        toast.style.zIndex = "9999";
        toast.style.transition = ".3s";

        document.body.appendChild(toast);

    }

    toast.textContent = message;

    toast.style.opacity = "1";

    clearTimeout(showToast.timeout);

    showToast.timeout = setTimeout(() => {

        toast.style.opacity = "0";

    }, 3000);

}

/* ==========================================================
   Save Dashboard State
========================================================== */

function saveDashboard() {

    const data = {

        todayStudy:
            localStorage.getItem("todayStudy"),

        completedTasks:
            localStorage.getItem("completedTasks"),

        streak:
            localStorage.getItem("studyStreak"),

        focus:
            localStorage.getItem("focusScore")

    };

    localStorage.setItem(
        "dashboardState",
        JSON.stringify(data)
    );

}

/* ==========================================================
   Before Exit
========================================================== */

window.addEventListener("beforeunload", () => {

    saveDashboard();

});

/* ==========================================================
   Helper
========================================================== */

function formatTime(seconds) {

    const hrs = Math.floor(seconds / 3600);

    const mins = Math.floor((seconds % 3600) / 60);

    const secs = seconds % 60;

    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

}

/* ==========================================================
   App Information
========================================================== */

console.table({

    Application: "A/L Exam Countdown",

    Version: App.version,

    Platform: navigator.platform,

    Language: navigator.language,

    Online: navigator.onLine

});

