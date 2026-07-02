/* ==========================================================
   A/L Exam Countdown
   File: js/countdown.js
   Live Countdown Module
========================================================== */

"use strict";

/* ==========================================================
   Configuration
========================================================== */

/*
   Change this date whenever the official A/L examination
   schedule is announced.
*/

const EXAM_DATE = new Date("2026-11-23T08:00:00");

/* ==========================================================
   Variables
========================================================== */

let countdownInterval = null;

/* ==========================================================
   Initialize
========================================================== */

function initializeCountdown() {

    updateCountdown();

    if (countdownInterval) {

        clearInterval(countdownInterval);

    }

    countdownInterval = setInterval(updateCountdown, 1000);

}

/* ==========================================================
   Update Countdown
========================================================== */

function updateCountdown() {

    const now = new Date();

    const distance = EXAM_DATE.getTime() - now.getTime();

    if (distance <= 0) {

        finishCountdown();

        return;

    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );

    setValue("days", days, 3);

    setValue("hours", hours);

    setValue("minutes", minutes);

    setValue("seconds", seconds);

    updateDocumentTitle(days, hours, minutes);

    updateProgress(distance);

}

/* ==========================================================
   Update Numbers
========================================================== */

function setValue(id, value, digits = 2) {

    const element = document.getElementById(id);

    if (!element) return;

    const newValue = String(value).padStart(digits, "0");

    if (element.textContent !== newValue) {

        element.textContent = newValue;

        element.animate(

            [

                {
                    transform: "scale(1)"
                },

                {
                    transform: "scale(1.15)"
                },

                {
                    transform: "scale(1)"
                }

            ],

            {

                duration: 300

            }

        );

    }

}

/* ==========================================================
   Browser Title
========================================================== */

function updateDocumentTitle(days, hours, minutes) {

    document.title =
        `${days}d ${hours}h ${minutes}m | A/L Countdown`;

}

/* ==========================================================
   Progress Until Exam
========================================================== */

function updateProgress(remainingMilliseconds) {

    const totalDuration =
        EXAM_DATE.getTime() -
        new Date("2026-01-01").getTime();

    const progress =
        (
            100 -
            (remainingMilliseconds / totalDuration) * 100
        ).toFixed(1);

    const bar = document.querySelector(".progress-bar");

    if (bar) {

        bar.style.width = `${Math.max(0, Math.min(progress, 100))}%`;

    }

}

/* ==========================================================
   Countdown Finished
========================================================== */

function finishCountdown() {

    clearInterval(countdownInterval);

    setValue("days", 0, 3);

    setValue("hours", 0);

    setValue("minutes", 0);

    setValue("seconds", 0);

    document.title = "🎉 Good Luck for Your A/L Exam!";

    playAlarm();

    showExamMessage();

}

/* ==========================================================
   Congratulations Message
========================================================== */

function showExamMessage() {

    const panel = document.getElementById("countdown");

    if (!panel) return;

    const message = document.createElement("div");

    message.className = "exam-message";

    message.style.marginTop = "25px";

    message.style.padding = "20px";

    message.style.borderRadius = "15px";

    message.style.background = "#22c55e";

    message.style.color = "#fff";

    message.style.textAlign = "center";

    message.style.fontSize = "22px";

    message.style.fontWeight = "600";

    message.innerHTML = `
        🎉 The A/L Examination has begun!<br>
        May Allah bless you with success.<br><br>
        <strong>Best of Luck! 🤲</strong>
    `;

    panel.appendChild(message);

}

/* ==========================================================
   Alarm
========================================================== */

function playAlarm() {

    const alarm = document.getElementById("alarm");

    if (!alarm) return;

    alarm.play().catch(() => {

        console.log("Unable to play alarm.");

    });

}

/* ==========================================================
   Remaining Time Object
========================================================== */

function getRemainingTime() {

    const now = new Date();

    const distance = EXAM_DATE - now;

    if (distance <= 0) {

        return null;

    }

    return {

        days: Math.floor(distance / 86400000),

        hours: Math.floor(
            (distance % 86400000) / 3600000
        ),

        minutes: Math.floor(
            (distance % 3600000) / 60000
        ),

        seconds: Math.floor(
            (distance % 60000) / 1000
        )

    };

}

/* ==========================================================
   Change Exam Date
========================================================== */

function setExamDate(date) {

    if (!(date instanceof Date)) {

        console.error("Invalid Date");

        return;

    }

    clearInterval(countdownInterval);

    window.EXAM_DATE = date;

    initializeCountdown();

}

/* ==========================================================
   Export
========================================================== */

window.initializeCountdown = initializeCountdown;
window.getRemainingTime = getRemainingTime;
window.setExamDate = setExamDate;

