/* =========================================================
   A/L Exam Countdown - Service Worker
   File: service-worker.js
   Version: 1.0.0
========================================================= */

const CACHE_NAME = "al-exam-countdown-v1";

/* --------------------------------------------------------
   Files to Cache
--------------------------------------------------------- */

const APP_ASSETS = [

    "./",
    "./index.html",

    "./manifest.json",

    "./css/style.css",
    "./css/dashboard.css",
    "./css/timer.css",
    "./css/responsive.css",

    "./js/app.js",
    "./js/storage.js",
    "./js/countdown.js",
    "./js/pomodoro.js",
    "./js/studyTimer.js",
    "./js/tasks.js",
    "./js/calendar.js",
    "./js/analytics.js",
    "./js/quotes.js",
    "./js/theme.js",
    "./js/notifications.js",

    "./assets/icons/icon-192.png",
    "./assets/icons/icon-512.png",

    "./assets/images/logo.png",

    "./assets/sounds/alarm.mp3"

];

/* =========================================================
   Install
========================================================= */

self.addEventListener("install", event => {

    console.log("Service Worker Installed");

    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache => {

            return cache.addAll(APP_ASSETS);

        })

    );

    self.skipWaiting();

});

/* =========================================================
   Activate
========================================================= */

self.addEventListener("activate", event => {

    console.log("Service Worker Activated");

    event.waitUntil(

        caches.keys().then(keys => {

            return Promise.all(

                keys.map(key => {

                    if (key !== CACHE_NAME) {

                        return caches.delete(key);

                    }

                })

            );

        })

    );

    self.clients.claim();

});

/* =========================================================
   Fetch
========================================================= */

self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") return;

    event.respondWith(

        caches.match(event.request)

        .then(cacheResponse => {

            if (cacheResponse) {

                return cacheResponse;

            }

            return fetch(event.request)

            .then(networkResponse => {

                const responseClone = networkResponse.clone();

                caches.open(CACHE_NAME)

                .then(cache => {

                    cache.put(event.request, responseClone);

                });

                return networkResponse;

            })

            .catch(() => {

                return caches.match("./index.html");

            });

        })

    );

});

/* =========================================================
   Push Notification
========================================================= */

self.addEventListener("push", event => {

    const data = event.data
        ? event.data.json()
        : {
            title: "Study Reminder",
            body: "Time to focus on your A/L studies! 📚",
            icon: "./assets/icons/icon-192.png"
        };

    event.waitUntil(

        self.registration.showNotification(

            data.title,

            {

                body: data.body,

                icon: data.icon,

                badge: "./assets/icons/icon-192.png",

                vibrate: [200, 100, 200],

                tag: "study-reminder",

                renotify: true,

                requireInteraction: false

            }

        )

    );

});

/* =========================================================
   Notification Click
========================================================= */

self.addEventListener("notificationclick", event => {

    event.notification.close();

    event.waitUntil(

        clients.matchAll({

            type: "window",

            includeUncontrolled: true

        })

        .then(clientList => {

            for (const client of clientList) {

                if ("focus" in client) {

                    return client.focus();

                }

            }

            if (clients.openWindow) {

                return clients.openWindow("./index.html");

            }

        })

    );

});

/* =========================================================
   Background Sync (Optional)
========================================================= */

self.addEventListener("sync", event => {

    if (event.tag === "sync-study-data") {

        event.waitUntil(syncStudyData());

    }

});

async function syncStudyData() {

    console.log("Syncing study data...");

    return Promise.resolve();

}

/* =========================================================
   Periodic Background Sync (Future Support)
========================================================= */

self.addEventListener("periodicsync", event => {

    if (event.tag === "daily-reminder") {

        event.waitUntil(

            self.registration.showNotification(

                "Daily Study Reminder 📖",

                {

                    body: "Don't forget today's study session.",

                    icon: "./assets/icons/icon-192.png"

                }

            )

        );

    }

});

