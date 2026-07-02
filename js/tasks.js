/* ==========================================================
   A/L Exam Countdown
   File: js/tasks.js
   Task Management System
========================================================== */

"use strict";

/* ==========================================================
   State
========================================================== */

let tasks = [];

/* ==========================================================
   Initialize
========================================================== */

function loadSavedTasks() {

    const saved = localStorage.getItem("tasks");

    if (saved) {

        try {

            tasks = JSON.parse(saved);

        } catch (e) {

            tasks = [];

        }

    }

    renderTasks();

}

/* ==========================================================
   Bind Events
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const addBtn = document.getElementById("addTask");

    const input = document.getElementById("taskInput");

    if (addBtn && input) {

        addBtn.addEventListener("click", addTaskFromInput);

        input.addEventListener("keypress", (e) => {

            if (e.key === "Enter") {

                addTaskFromInput();

            }

        });

    }

});

/* ==========================================================
   Add Task
========================================================== */

function addTaskFromInput() {

    const input = document.getElementById("taskInput");

    if (!input) return;

    const text = input.value.trim();

    if (!text) return;

    addTask(text);

    input.value = "";

}

/* ==========================================================
   Core Add Task
========================================================== */

function addTask(text) {

    const task = {

        id: Date.now(),

        text,

        completed: false,

        createdAt: new Date().toISOString()

    };

    tasks.push(task);

    saveTasks();

    renderTasks();

}

/* ==========================================================
   Toggle Complete
========================================================== */

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {

            const updated = {

                ...task,

                completed: !task.completed

            };

            if (updated.completed) {

                incrementCompletedTasks();

            }

            return updated;

        }

        return task;

    });

    saveTasks();

    renderTasks();

}

/* ==========================================================
   Delete Task
========================================================== */

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    renderTasks();

}

/* ==========================================================
   Render Tasks
========================================================== */

function renderTasks() {

    const list = document.getElementById("taskList");

    if (!list) return;

    list.innerHTML = "";

    if (tasks.length === 0) {

        list.innerHTML = `
            <li class="empty-state">
                <div>
                    <h3>No tasks yet</h3>
                    <p>Add your first study task 📚</p>
                </div>
            </li>
        `;

        return;

    }

    tasks.forEach(task => {

        const li = document.createElement("li");

        li.className = task.completed ? "completed" : "";

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="task-actions">

                <button onclick="toggleTask(${task.id})">
                    ${task.completed ? "↩" : "✔"}
                </button>

                <button onclick="deleteTask(${task.id})">
                    🗑
                </button>

            </div>
        `;

        list.appendChild(li);

    });

}

/* ==========================================================
   Save Tasks
========================================================== */

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

/* ==========================================================
   Completed Task Counter
========================================================== */

function incrementCompletedTasks() {

    const current =
        Number(localStorage.getItem("completedTasks")) || 0;

    localStorage.setItem(
        "completedTasks",
        current + 1
    );

}

/* ==========================================================
   Clear All Tasks
========================================================== */

function clearAllTasks() {

    tasks = [];

    saveTasks();

    renderTasks();

}

/* ==========================================================
   Get Task Stats
========================================================== */

function getTaskStats() {

    const completed = tasks.filter(t => t.completed).length;

    const pending = tasks.length - completed;

    return {

        total: tasks.length,

        completed,

        pending

    };

}

/* ==========================================================
   Export
========================================================== */

window.loadSavedTasks = loadSavedTasks;
window.addTask = addTask;
window.toggleTask = toggleTask;
window.deleteTask = deleteTask;
window.clearAllTasks = clearAllTasks;
window.getTaskStats = getTaskStats;

