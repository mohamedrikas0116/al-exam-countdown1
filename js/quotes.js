/* ==========================================================
   A/L Exam Countdown
   File: js/quotes.js
   Daily Motivation Quotes Module
========================================================== */

"use strict";

/* ==========================================================
   Quotes Database
========================================================== */

const QUOTES = [

    "Discipline is the bridge between goals and achievement.",

    "Success doesn’t come from what you do occasionally, it comes from what you do consistently.",

    "Small daily improvements lead to stunning results.",

    "Push yourself, because no one else is going to do it for you.",

    "Your future is created by what you do today, not tomorrow.",

    "Study hard, stay humble, and trust the process.",

    "Dream big. Work hard. Stay focused.",

    "The pain of studying is temporary, but the pride of success is forever.",

    "Don’t stop when you are tired. Stop when you are done.",

    "Focus on your goal. Don’t look in any direction but ahead.",

    "Hard work beats talent when talent doesn’t work hard.",

    "One day or day one. You decide.",

    "Success is the sum of small efforts repeated every day.",

    "If you want it, work for it.",

    "No shortcuts. Only discipline.",

    "Study like there is no tomorrow."

];

/* ==========================================================
   Initialize Quotes
========================================================== */

function initializeQuotes() {

    showDailyQuote();

    setInterval(checkQuoteUpdate, 60000); // check every minute

}

/* ==========================================================
   Show Daily Quote
========================================================== */

function showDailyQuote() {

    const quoteElement = document.getElementById("dailyQuote");

    if (!quoteElement) return;

    const todayIndex = getDailyIndex();

    const quote = QUOTES[todayIndex];

    quoteElement.textContent = quote;

    saveQuoteHistory(quote);

}

/* ==========================================================
   Stable Daily Index (changes once per day)
========================================================== */

function getDailyIndex() {

    const today = new Date();

    const seed = today.getFullYear() * 1000 + today.getMonth() * 100 + today.getDate();

    return seed % QUOTES.length;

}

/* ==========================================================
   Check Update
========================================================== */

function checkQuoteUpdate() {

    const lastDate = localStorage.getItem("lastQuoteDate");

    const today = new Date().toDateString();

    if (lastDate !== today) {

        showDailyQuote();

        localStorage.setItem("lastQuoteDate", today);

    }

}

/* ==========================================================
   Save Quote History
========================================================== */

function saveQuoteHistory(quote) {

    let history = Storage.get ? Storage.get("quoteHistory", []) : JSON.parse(localStorage.getItem("quoteHistory") || "[]");

    history.push({

        quote,

        date: new Date().toISOString()

    });

    if (history.length > 30) {

        history = history.slice(-30);

    }

    if (Storage.set) {

        Storage.set("quoteHistory", history);

    } else {

        localStorage.setItem("quoteHistory", JSON.stringify(history));

    }

}

/* ==========================================================
   Get Random Quote (optional feature)
========================================================== */

function getRandomQuote() {

    const index = Math.floor(Math.random() * QUOTES.length);

    return QUOTES[index];

}

/* ==========================================================
   Force Refresh Quote
========================================================== */

function refreshQuote() {

    const quoteElement = document.getElementById("dailyQuote");

    if (!quoteElement) return;

    const quote = getRandomQuote();

    quoteElement.textContent = quote;

}

/* ==========================================================
   Export
========================================================== */

window.initializeQuotes = initializeQuotes;
window.getRandomQuote = getRandomQuote;
window.refreshQuote = refreshQuote;

