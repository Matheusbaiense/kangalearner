/* Minimal service worker: network-first for documents; cache fallback for static assets under /assets/. */
const CACHE = "kanga-assets-v9";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const path = url.pathname;
  const isAsset =
    path.includes("/assets/") || path.endsWith("manifest.json") || path.endsWith("/sw.js");

  if (isAsset) {
    event.respondWith(
      caches.open(CACHE).then((cache) =>
        fetch(req)
          .then((res) => {
            if (res.ok) cache.put(req, res.clone());
            return res;
          })
          .catch(() => cache.match(req))
      )
    );
    return;
  }
});
