/* ==========================================================
   A/L Exam Countdown
   File: js/calendar.js
   Simple Study Calendar Module
========================================================== */

"use strict";

/* ==========================================================
   State
========================================================== */

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

/* ==========================================================
   Initialize
========================================================== */

function initializeCalendar() {

    renderCalendar(currentMonth, currentYear);

}

/* ==========================================================
   Render Calendar
========================================================== */

function renderCalendar(month, year) {

    const container = document.getElementById("calendarContainer");

    if (!container) return;

    container.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const studyDays = getStudyDays();

    /* Header */

    const header = document.createElement("div");

    header.style.display = "flex";

    header.style.justifyContent = "space-between";

    header.style.alignItems = "center";

    header.style.marginBottom = "15px";

    header.innerHTML = `
        <h3>${getMonthName(month)} ${year}</h3>
        <div>
            <button onclick="prevMonth()">⬅</button>
            <button onclick="nextMonth()">➡</button>
        </div>
    `;

    container.appendChild(header);

    /* Grid */

    const grid = document.createElement("div");

    grid.className = "calendar-grid";

    /* Empty slots before first day */

    for (let i = 0; i < firstDay; i++) {

        const empty = document.createElement("div");

        grid.appendChild(empty);

    }

    /* Days */

    for (let day = 1; day <= daysInMonth; day++) {

        const dateKey = `${year}-${month + 1}-${day}`;

        const dayEl = document.createElement("div");

        dayEl.className = "calendar-day";

        /* Today highlight */

        const today = new Date();

        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {

            dayEl.classList.add("today");

        }

        /* Study day highlight */

        if (studyDays.includes(dateKey)) {

            dayEl.classList.add("study");

        }

        dayEl.innerHTML = `<strong>${day}</strong>`;

        dayEl.onclick = () => toggleStudyDay(dateKey, dayEl);

        grid.appendChild(dayEl);

    }

    container.appendChild(grid);

}

/* ==========================================================
   Toggle Study Day
========================================================== */

function toggleStudyDay(dateKey, element) {

    let studyDays = getStudyDays();

    if (studyDays.includes(dateKey)) {

        studyDays = studyDays.filter(d => d !== dateKey);

        element.classList.remove("study");

    } else {

        studyDays.push(dateKey);

        element.classList.add("study");

    }

    localStorage.setItem(
        "studyDays",
        JSON.stringify(studyDays)
    );

}

/* ==========================================================
   Get Study Days
========================================================== */

function getStudyDays() {

    const data = localStorage.getItem("studyDays");

    if (!data) return [];

    try {

        return JSON.parse(data);

    } catch (e) {

        return [];

    }

}

/* ==========================================================
   Navigation
========================================================== */

function nextMonth() {

    currentMonth++;

    if (currentMonth > 11) {

        currentMonth = 0;

        currentYear++;

    }

    renderCalendar(currentMonth, currentYear);

}

function prevMonth() {

    currentMonth--;

    if (currentMonth < 0) {

        currentMonth = 11;

        currentYear--;

    }

    renderCalendar(currentMonth, currentYear);

}

/* ==========================================================
   Helpers
========================================================== */

function getMonthName(month) {

    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    return months[month];
}

/* ==========================================================
   Study Streak Calculation (simple)
========================================================== */

function calculateStreak() {

    const studyDays = getStudyDays();

    if (studyDays.length === 0) return 0;

    let streak = 0;

    const today = new Date();

    for (let i = 0; i < 365; i++) {

        const date = new Date(today);

        date.setDate(today.getDate() - i);

        const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        if (studyDays.includes(key)) {

            streak++;

        } else {

            break;

        }

    }

    localStorage.setItem("studyStreak", streak);

    return streak;

}

/* ==========================================================
   Export
========================================================== */

window.initializeCalendar = initializeCalendar;
window.nextMonth = nextMonth;
window.prevMonth = prevMonth;
window.calculateStreak = calculateStreak;

