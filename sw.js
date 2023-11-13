const HOST = 'http://localhost:3000';
const HOST_API = 'https://api.openweathermap.org/data/2.5/weather';

self.addEventListener( 'install', aoInstalar );
self.addEventListener( 'fetch', aoSolicitarRecurso );
self.addEventListener( 'active', aoAtivar );

function aoInstalar(e) {
    e.waitUntil(criarCache());
    self.skipWaiting();
}


async function criarCache() {
    const cache = await caches.open( 'v1' );
    return cache.addAll(
        [
            'index.html',
            'assets/js/index.js',
            'assets/js/previsao.js',
            'assets/js/localizacao.js',
            'assets/js/sse.js',
            'assets/css/style.css',
            'manifest.json',
            'assets/img/favicon.ico',
            'assets/img/logo-256.png',
            'assets/img/logo-512.png',
        ]
    );
}

async function aoSolicitarRecurso(e) {

    if(e.request.url.includes('/previsao?')) {
        return;
    }
    else if(e.request.url.startsWith(HOST_API)) {
        return e.respondWith(networkFirst(e))
    }
    return e.respondWith(cacheFirst(e));
}

async function cacheFirst( e ) {
    const cache = await caches.open('v1');
    let response = await cache.match(e.request);
    if (!response) {
        response = await fetch( e.request );
        if (response.ok) {
            cache.put( e.request, response.clone() );
        }
    }
    return response;
}

async function networkFirst( e ) {
    try {
        let response = await fetch( e.request );
        const cache = await caches.open( 'v1' );
        if ( ! response.ok || ! response ) {
            response = await cache.match( e.request );
        } else {
            cache.put( e.request, response.clone() );
        }
        return response;
    } catch (error){
        const cache = await caches.open( 'v1' );
        response = await cache.match( e.request );
        return response;
    }
}


function aoAtivar() {
}