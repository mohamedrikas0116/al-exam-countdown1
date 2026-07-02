/* ==========================================================
   A/L Exam Countdown
   File: js/storage.js
   Central Storage Manager (LocalStorage Utilities)
========================================================== */

"use strict";

/* ==========================================================
   Safe LocalStorage Wrapper
========================================================== */

const Storage = {

    set(key, value) {

        try {

            localStorage.setItem(key, JSON.stringify(value));

        } catch (e) {

            console.error("Storage set error:", key, e);

        }

    },

    get(key, fallback = null) {

        try {

            const value = localStorage.getItem(key);

            return value ? JSON.parse(value) : fallback;

        } catch (e) {

            console.error("Storage get error:", key, e);

            return fallback;

        }

    },

    remove(key) {

        try {

            localStorage.removeItem(key);

        } catch (e) {

            console.error("Storage remove error:", key, e);

        }

    },

    clear() {

        try {

            localStorage.clear();

        } catch (e) {

            console.error("Storage clear error:", e);

        }

    }

};

/* ==========================================================
   App Data Schema (Defaults)
========================================================== */

const DEFAULT_DATA = {

    todayStudy: 0,            // minutes

    studySeconds: 0,

    completedTasks: 0,

    studyStreak: 0,

    focusScore: 100,

    activeSubject: "Other",

    tasks: [],

    studyDays: [],

    weeklyStudyData: [120, 90, 150, 60, 180, 30, 200]

};

/* ==========================================================
   Initialize Storage (First Run)
========================================================== */

function initializeStorage() {

    Object.keys(DEFAULT_DATA).forEach(key => {

        if (Storage.get(key) === null) {

            Storage.set(key, DEFAULT_DATA[key]);

        }

    });

}

/* ==========================================================
   Study Tracking Helpers
========================================================== */

function addStudyMinutes(minutes) {

    const current = Storage.get("todayStudy", 0);

    Storage.set("todayStudy", current + minutes);

}

function addStudySeconds(seconds) {

    const current = Storage.get("studySeconds", 0);

    Storage.set("studySeconds", current + seconds);

    const minutes = Math.floor((current + seconds) / 60);

    Storage.set("todayStudy", minutes);

}

/* ==========================================================
   Task Helpers
========================================================== */

function saveTasks(tasks) {

    Storage.set("tasks", tasks);

}

function getTasks() {

    return Storage.get("tasks", []);

}

/* ==========================================================
   Study Days Helpers
========================================================== */

function addStudyDay(dateKey) {

    const days = Storage.get("studyDays", []);

    if (!days.includes(dateKey)) {

        days.push(dateKey);

        Storage.set("studyDays", days);

    }

}

function removeStudyDay(dateKey) {

    let days = Storage.get("studyDays", []);

    days = days.filter(d => d !== dateKey);

    Storage.set("studyDays", days);

}

/* ==========================================================
   Weekly Study Data
========================================================== */

function updateWeeklyStudy(dayIndex, minutes) {

    const data = Storage.get("weeklyStudyData", DEFAULT_DATA.weeklyStudyData);

    if (dayIndex >= 0 && dayIndex < 7) {

        data[dayIndex] += minutes;

        Storage.set("weeklyStudyData", data);

    }

}

/* ==========================================================
   Reset Functions
========================================================== */

function resetAllData() {

    Storage.clear();

    initializeStorage();

}

/* ==========================================================
   Migration / Fix Data (optional safety)
========================================================== */

function sanitizeData() {

    const todayStudy = Storage.get("todayStudy", 0);

    if (typeof todayStudy !== "number") {

        Storage.set("todayStudy", 0);

    }

}

/* ==========================================================
   Export
========================================================== */

window.Storage = Storage;

window.initializeStorage = initializeStorage;

window.addStudyMinutes = addStudyMinutes;

window.addStudySeconds = addStudySeconds;

window.saveTasks = saveTasks;

window.getTasks = getTasks;

window.addStudyDay = addStudyDay;

window.removeStudyDay = removeStudyDay;

window.updateWeeklyStudy = updateWeeklyStudy;

window.resetAllData = resetAllData;

window.sanitizeData = sanitizeData;

