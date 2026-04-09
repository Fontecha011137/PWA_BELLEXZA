const CACHE_NAME = "pwa-belleza-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/contacto.js"
];

// Instalar
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activar
self.addEventListener("activate", event => {
  console.log("Service Worker activado");
});

// Fetch (modo offline)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});