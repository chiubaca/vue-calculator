const filesToCache = [
    '/css-reset.css',
    '/style.css',
    '/app.js',
    '/index.html',
    '/vue.js',
    '/offline.html'
]
const offlineURL= 'offline.html';
const staticCacheName = 'cache-v3'

// listen for install event
// the install event is a good time to be caching assets
self.addEventListener('install', function(event){
    //perform some task
    console.log("SW installed!", event)
    
    //bypass waiting event, which usually means the user has to close down all tabs
    //use with caution as can casue inconsistency across tabs
    //self.skipWaiting()

    //cache local resources
    console.log("Caching resources")

    event.waitUntil(
        caches.open(staticCacheName)
        .then(function(cache){
            return cache.addAll(filesToCache)
        })
    )
})

// listen for activate event
self.addEventListener('activate', function(event){
    //Clean old app cache if there is one
    console.log("activating new service worker" , event)
    const cacheWhiteList = [staticCacheName];

    event.waitUntil(
        caches.keys().then(function(cacheNames){
            cacheNames.map(function(cacheName){
                if(cacheWhiteList.indexOf(cacheName) === -1){
                    return caches.delete(cacheName);
                }
            })
        })
    )

})

//intercept network requests
self.addEventListener('fetch', function(event){
    console.log('Fetching: ' , event.request.url)

    event.respondWith(
        caches.match(event.request)
        .then(function(response){
            if(response){
                console.log(event.request.url , " found in the cache!")
                return response
            }
            console.log("cached request for " , event.request.url)
            return fetch(event.request)

        })
        .catch(function(error){
            //TODO: respond with offline pages
            console.log("Error, " , error)
            return caches.match(offlineURL);
        })
    )
})