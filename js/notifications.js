/* ==========================================================
   A/L Exam Countdown
   File: js/notifications.js
   Notifications + Study Reminders Module
========================================================== */

"use strict";

/* ==========================================================
   Permission Handling
========================================================== */

function initializeNotifications() {

    if (!("Notification" in window)) {

        console.warn("Notifications not supported");

        return;

    }

    if (Notification.permission === "default") {

        Notification.requestPermission().then(permission => {

            console.log("Notification permission:", permission);

        });

    }

    startReminderEngine();

}

/* ==========================================================
   Core Notification Sender
========================================================== */

function sendNotification(title, body, options = {}) {

    if (!("Notification" in window)) return;

    if (Notification.permission !== "granted") return;

    const notification = new Notification(title, {

        body: body,

        icon: "assets/icons/icon-192.png",

        badge: "assets/icons/icon-192.png",

        vibrate: [200, 100, 200],

        ...options

    });

    notification.onclick = () => {

        window.focus();

        notification.close();

    };

}

/* ==========================================================
   Pomodoro Alerts
========================================================== */

function notifyPomodoroStart() {

    sendNotification(
        "🍅 Focus Session Started",
        "Stay focused and avoid distractions."
    );

}

function notifyPomodoroBreak() {

    sendNotification(
        "☕ Break Time",
        "Relax for a few minutes before next session."
    );

}

/* ==========================================================
   Study Timer Alerts
========================================================== */

function notifyStudyStart(subject) {

    sendNotification(
        "📖 Study Started",
        `Focus on ${subject} now.`
    );

}

function notifyStudyStop() {

    sendNotification(
        "⏸ Study Paused",
        "Take a short break."
    );

}

/* ==========================================================
   Exam Countdown Alerts
========================================================== */

function checkExamWarning() {

    const examDate = new Date("2026-11-23T08:00:00");

    const now = new Date();

    const diffDays = Math.floor(
        (examDate - now) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 30) {

        sendNotification(
            "📅 30 Days Left!",
            "Start revising seriously now."
        );

    }

    if (diffDays === 7) {

        sendNotification(
            "⚠ 7 Days Left!",
            "Final revision time!"
        );

    }

    if (diffDays === 1) {

        sendNotification(
            "🔥 Tomorrow is the Exam!",
            "Stay calm and revise key points."
        );

    }

}

/* ==========================================================
   Reminder Engine
========================================================== */

function startReminderEngine() {

    setInterval(() => {

        checkExamWarning();

        checkIdleReminder();

    }, 60 * 60 * 1000); // every 1 hour

}

/* ==========================================================
   Idle Study Reminder
========================================================== */

function checkIdleReminder() {

    const lastStudy =
        Number(localStorage.getItem("studySeconds")) || 0;

    const lastActive =
        Number(localStorage.getItem("lastActiveTime")) || Date.now();

    const now = Date.now();

    const diffMinutes = (now - lastActive) / (1000 * 60);

    if (diffMinutes > 60 && lastStudy < 120) {

        sendNotification(
            "📚 Time to Study!",
            "You haven't studied for a while."
        );

    }

}

/* ==========================================================
   Activity Tracker Hook
========================================================== */

function updateLastActiveTime() {

    localStorage.setItem("lastActiveTime", Date.now());

}

/* ==========================================================
   Auto Activity Tracking
========================================================== */

document.addEventListener("click", updateLastActiveTime);

document.addEventListener("keydown", updateLastActiveTime);

/* ==========================================================
   Export
========================================================== */

window.initializeNotifications = initializeNotifications;
window.sendNotification = sendNotification;

window.notifyPomodoroStart = notifyPomodoroStart;
window.notifyPomodoroBreak = notifyPomodoroBreak;

window.notifyStudyStart = notifyStudyStart;
window.notifyStudyStop = notifyStudyStop;

window.checkExamWarning = checkExamWarning;
window.updateLastActiveTime = updateLastActiveTime;

