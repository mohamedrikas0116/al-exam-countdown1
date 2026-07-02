/* ==========================================================
   A/L Exam Countdown
   File: js/analytics.js
   Study Analytics Module
========================================================== */

"use strict";

/* ==========================================================
   State
========================================================== */

let chartInstance = null;

/* ==========================================================
   Initialize
========================================================== */

function initializeAnalytics() {

    renderStudyChart();

    updateAnalyticsSummary();

    setInterval(updateAnalyticsSummary, 5000);

}

/* ==========================================================
   Analytics Summary
========================================================== */

function updateAnalyticsSummary() {

    const todayStudy =
        Number(localStorage.getItem("todayStudy")) || 0;

    const streak =
        Number(localStorage.getItem("studyStreak")) || 0;

    const focus =
        Number(localStorage.getItem("focusScore")) || 100;

    const completed =
        Number(localStorage.getItem("completedTasks")) || 0;

    const data = {

        todayStudy,
        streak,
        focus,
        completed

    };

    localStorage.setItem(
        "analyticsSnapshot",
        JSON.stringify(data)
    );

}

/* ==========================================================
   Study Chart (Simple Canvas Chart)
========================================================== */

function renderStudyChart() {

    const canvas = document.getElementById("studyChart");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const data = getWeeklyStudyData();

    drawChart(ctx, data);

}

/* ==========================================================
   Mock Weekly Data (can be replaced later)
========================================================== */

function getWeeklyStudyData() {

    const raw = localStorage.getItem("weeklyStudyData");

    if (raw) {

        return JSON.parse(raw);

    }

    // fallback demo data
    return [
        120, // Mon
        90,  // Tue
        150, // Wed
        60,  // Thu
        180, // Fri
        30,  // Sat
        200  // Sun
    ];

}

/* ==========================================================
   Draw Simple Bar Chart
========================================================== */

function drawChart(ctx, data) {

    const width = ctx.canvas.width = ctx.canvas.offsetWidth;

    const height = ctx.canvas.height = 300;

    const barWidth = width / data.length;

    const max = Math.max(...data);

    ctx.clearRect(0, 0, width, height);

    data.forEach((value, index) => {

        const barHeight = (value / max) * (height - 40);

        const x = index * barWidth + 10;

        const y = height - barHeight - 20;

        /* Bar */

        ctx.fillStyle = "#2563eb";

        ctx.fillRect(x, y, barWidth - 20, barHeight);

        /* Labels */

        ctx.fillStyle = "#64748b";

        ctx.font = "12px Arial";

        ctx.fillText(getDayLabel(index), x, height - 5);

        ctx.fillText(value + "m", x, y - 5);

    });

}

/* ==========================================================
   Day Labels
========================================================== */

function getDayLabel(index) {

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return days[index] || "";

}

/* ==========================================================
   Update Weekly Data (called externally)
========================================================== */

function updateWeeklyStudy(minutes) {

    let data = getWeeklyStudyData();

    const todayIndex = new Date().getDay() - 1;

    if (todayIndex >= 0 && todayIndex < 7) {

        data[todayIndex] += minutes;

    }

    localStorage.setItem(
        "weeklyStudyData",
        JSON.stringify(data)
    );

    renderStudyChart();

}

/* ==========================================================
   Calculate Focus Score
========================================================== */

function calculateFocusScore() {

    const study = Number(localStorage.getItem("todayStudy")) || 0;

    const breaks = Number(localStorage.getItem("breakTime")) || 0;

    let score = 100;

    if (study < 120) score -= 20;

    if (breaks > study * 0.3) score -= 15;

    if (score < 0) score = 0;

    localStorage.setItem("focusScore", score);

    return score;

}

/* ==========================================================
   Productivity Level
========================================================== */

function getProductivityLevel() {

    const study = Number(localStorage.getItem("todayStudy")) || 0;

    if (study > 300) return "🔥 Excellent";

    if (study > 180) return "💪 Good";

    if (study > 60) return "📘 Average";

    return "⚠ Low";

}

/* ==========================================================
   Export
========================================================== */

window.initializeAnalytics = initializeAnalytics;
window.updateWeeklyStudy = updateWeeklyStudy;
window.calculateFocusScore = calculateFocusScore;
window.getProductivityLevel = getProductivityLevel;

