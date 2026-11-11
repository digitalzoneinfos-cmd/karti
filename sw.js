/* Karti service worker : met en cache l'application pour un démarrage rapide et hors ligne.
   Changez VERSION à chaque mise à jour du site pour forcer le rafraîchissement du cache. */
const VERSION="karti-v1";
const ASSETS=[
 "./",
 "index.html",
 "manifest.webmanifest",
 "icons/icon-192.png",
 "icons/icon-512.png",
 "icons/apple-touch-icon.png",
 "media/poster.jpg",
 "cards/abmoda.jpg",
 "cards/academie.jpg",
 "cards/ademe.jpg",
 "cards/alioua.jpg",
 "cards/amira.jpg",
 "cards/avocat.jpg",
 "cards/boucherie.jpg",
 "cards/boulangerie.jpg",
 "cards/ceramique.jpg",
 "cards/crma.jpg",
 "cards/depannage.jpg",
 "cards/domoelec.jpg",
 "cards/ecogaz.jpg",
 "cards/errochd.jpg",
 "cards/kassi.jpg",
 "cards/lavage.jpg",
 "cards/nlma.jpg",
 "cards/thiziri.jpg",
 "cards/tikjda.jpg",
 "designs/d13.jpg",
 "designs/d14.jpg",
 "designs/d17.jpg",
 "designs/d18.jpg",
 "designs/d19.jpg",
 "designs/d20.jpg",
 "designs/d33.jpg",
 "designs/d34.jpg",
 "designs/d37.jpg",
 "designs/d38.jpg",
 "designs/d43.jpg",
 "designs/d44.jpg",
 "designs/d45.jpg",
 "designs/d49.jpg",
 "designs/d7.jpg",
 "designs/d8.jpg"
];
self.addEventListener("install",e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;
  const u=new URL(r.url);
  // pages : réseau d'abord (toujours la dernière version), cache si hors ligne
  if(r.mode==="navigate"){e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(VERSION).then(x=>x.put("index.html",c));return res}).catch(()=>caches.match("index.html")));return}
  // vidéo : laisser le navigateur gérer les requêtes partielles
  if(u.pathname.endsWith(".mp4"))return;
  // images, polices, fichiers : cache d'abord
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok&&(u.origin===location.origin||u.host.includes("fonts.g"))){const c=res.clone();caches.open(VERSION).then(x=>x.put(r,c))}return res})));
});
