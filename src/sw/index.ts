/// <reference lib="webworker" />

import { set } from 'idb-keyval';

declare var self: ServiceWorkerGlobalScope;

const SHARE_TARGET_ID = 'pwa-file-shared';

self.addEventListener('install', () => {
    console.log('Service worker installed');
});

self.addEventListener('activate', () => {
    console.log('Service worker activated');
    return self.clients.claim();
});

self.addEventListener('fetch', (event: FetchEvent) => {
    const url = new URL(event.request.url);

    if (event.request.method === 'POST' && url.pathname === '/share-target') {
        event.respondWith((async () => {
            const data = await event.request.formData();            
            const file = data.get('file');
            if (!file) {
                return Response.redirect('/', 303);
            }

            if (typeof file === 'string') {
                set(SHARE_TARGET_ID, file);
                return Response.redirect('/', 303);
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                if (!e.target) {
                    return;
                }

                set(SHARE_TARGET_ID, e.target.result);
            };
            reader.readAsText(file);

            return Response.redirect('/', 303);
        })());
    }
});
