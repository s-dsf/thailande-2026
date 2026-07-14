const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    const url = new URL(request.url);

    // ── /gs-get — Proxy GET Google Sheets ──
    if (url.pathname === '/gs-get' && request.method === 'GET') {
      try {
        const gsUrl = url.searchParams.get('gsUrl');
        if (!gsUrl) return json({ error: 'gsUrl manquant' }, 400);
        const r = await fetch(gsUrl + '&t=' + Date.now());
        const data = await r.text();
        return new Response(data, {
          status: r.status,
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      } catch(e) {
        return json({ error: e.message }, 500);
      }
    }

    // ── /gs — Proxy POST Google Sheets (résout les problèmes CORS iOS) ──
    if (url.pathname === '/gs' && request.method === 'POST') {
      try {
        const body = await request.json();
        const gsUrl = body.gsUrl;
        if (!gsUrl) return json({ error: 'gsUrl manquant' }, 400);
        // Supprimer gsUrl du payload avant d'envoyer à Sheets
        delete body.gsUrl;
        const r = await fetch(gsUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await r.text();
        return new Response(data, {
          status: r.status,
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      } catch(e) {
        return json({ error: e.message }, 500);
      }
    }

    // ── / — Proxy IA Claude ──
    if (request.method === 'POST') {
      try {
        const body = await request.json();
        const r = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': env.CLAUDE_API_KEY,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify(body),
        });
        const data = await r.json();
        return new Response(JSON.stringify(data), {
          status: r.status,
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      } catch(e) {
        return json({ error: e.message }, 500);
      }
    }

    return new Response('Worker Thaïlande 2026 ✅', { headers: CORS });
  }
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}
