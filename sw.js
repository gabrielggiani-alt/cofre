var CACHE = "cofre-v1";
var ARQUIVOS = ["./", "./index.html", "./manifest.webmanifest",
                "./icon-192.png", "./icon-512.png", "./icon-512-maskable.png"];

self.addEventListener("install", function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c){
    return c.addAll(ARQUIVOS).catch(function(){});
  }));
});

self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.map(function(k){
      if(k !== CACHE) return caches.delete(k);
    }));
  }).then(function(){ return self.clients.claim(); }));
});

self.addEventListener("fetch", function(e){
  if(e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(function(r){
      return r || fetch(e.request).then(function(resp){
        var copia = resp.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, copia); });
        return resp;
      }).catch(function(){ return caches.match("./index.html"); });
    })
  );
});
