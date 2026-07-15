// Función serverless de Vercel: guarda y lee el estado del panel (CRM, financiero, checklist).
// Usa Upstash Redis vía su API REST. Detecta automáticamente las variables de entorno
// que inyecta la integración de Vercel (tanto nombres KV_* como UPSTASH_*).
//
// Variables de entorno:
//   KV_REST_API_URL / UPSTASH_REDIS_REST_URL   -> URL de la base de datos (se añade sola al conectar Upstash)
//   KV_REST_API_TOKEN / UPSTASH_REDIS_REST_TOKEN -> token (se añade solo al conectar Upstash)
//   APP_PASSWORD (opcional) -> si la defines, el panel pedirá esa contraseña para acceder.

const REDIS_URL   = process.env.KV_REST_API_URL   || process.env.UPSTASH_REDIS_REST_URL   || "";
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
const APP_PASSWORD = process.env.APP_PASSWORD || "";
const KEY = "funerarias_panel_state_v1";

async function redis(command) {
  const r = await fetch(REDIS_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
  });
  if (!r.ok) throw new Error("Redis error " + r.status);
  return r.json(); // { result: ... }
}

export default async function handler(req, res) {
  // CORS / preflight
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-app-password");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") { res.status(204).end(); return; }

  // Contraseña opcional
  if (APP_PASSWORD) {
    const given = req.headers["x-app-password"] || "";
    if (given !== APP_PASSWORD) { res.status(401).json({ error: "unauthorized" }); return; }
  }

  // Sin base de datos configurada todavía: el panel funcionará en modo local.
  if (!REDIS_URL || !REDIS_TOKEN) {
    res.status(200).json({ configured: false, state: null });
    return;
  }

  try {
    if (req.method === "GET") {
      const out = await redis(["GET", KEY]);
      const state = out && out.result ? JSON.parse(out.result) : null;
      res.status(200).json({ configured: true, state });
      return;
    }
    if (req.method === "POST") {
      let body = req.body;
      if (typeof body === "string") body = JSON.parse(body || "{}");
      const state = (body && body.state) || {};
      await redis(["SET", KEY, JSON.stringify(state)]);
      res.status(200).json({ ok: true });
      return;
    }
    res.status(405).json({ error: "method not allowed" });
  } catch (e) {
    res.status(500).json({ error: String(e && e.message ? e.message : e) });
  }
}
