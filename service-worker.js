const filesToCache = [
    '/css-reset.css',
    '/style.css',
    '/app.js',
    '/index.html',
    '/vue.js'
]

const staticCacheName = 'cache-v1'

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
// the activate event is a good time to clean outdated caches
self.addEventListener('activate', function(event){
    //perform some task
    console.log("SW activated!" , event)
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
        })
    )
})