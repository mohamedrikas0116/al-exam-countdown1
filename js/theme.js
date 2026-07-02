/* ==========================================================
   A/L Exam Countdown
   File: js/theme.js
   Theme (Dark / Light) Manager
========================================================== */

"use strict";

/* ==========================================================
   Theme State
========================================================== */

const THEME_KEY = "appTheme";

const THEMES = {
    LIGHT: "light",
    DARK: "dark"
};

/* ==========================================================
   Initialize Theme
========================================================== */

function loadSavedTheme() {

    const saved = localStorage.getItem(THEME_KEY);

    if (saved === THEMES.DARK) {

        document.body.classList.add("dark");

    } else {

        document.body.classList.remove("dark");

    }

    updateThemeIcon();

}

/* ==========================================================
   Toggle Theme
========================================================== */

function toggleTheme() {

    const isDark = document.body.classList.contains("dark");

    if (isDark) {

        document.body.classList.remove("dark");

        localStorage.setItem(THEME_KEY, THEMES.LIGHT);

    } else {

        document.body.classList.add("dark");

        localStorage.setItem(THEME_KEY, THEMES.DARK);

    }

    updateThemeIcon();

}

/* ==========================================================
   Set Theme Explicitly
========================================================== */

function setTheme(mode) {

    if (mode === THEMES.DARK) {

        document.body.classList.add("dark");

    } else {

        document.body.classList.remove("dark");

    }

    localStorage.setItem(THEME_KEY, mode);

    updateThemeIcon();

}

/* ==========================================================
   Theme Icon Update
========================================================== */

function updateThemeIcon() {

    const btn = document.getElementById("themeToggle");

    if (!btn) return;

    const isDark = document.body.classList.contains("dark");

    btn.textContent = isDark ? "☀️" : "🌙";

}

/* ==========================================================
   Auto Theme (optional system support)
========================================================== */

function applySystemTheme() {

    const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    const saved = localStorage.getItem(THEME_KEY);

    if (!saved) {

        if (prefersDark) {

            document.body.classList.add("dark");

            localStorage.setItem(THEME_KEY, THEMES.DARK);

        } else {

            document.body.classList.remove("dark");

            localStorage.setItem(THEME_KEY, THEMES.LIGHT);

        }

    }

    updateThemeIcon();

}

/* ==========================================================
   Smooth Theme Transition
========================================================== */

function enableThemeTransitions() {

    document.documentElement.style.transition = "all 0.3s ease";

}

/* ==========================================================
   Export
========================================================== */

window.loadSavedTheme = loadSavedTheme;
window.toggleTheme = toggleTheme;
window.setTheme = setTheme;
window.applySystemTheme = applySystemTheme;
window.enableThemeTransitions = enableThemeTransitions;

