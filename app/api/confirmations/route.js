import { env } from 'cloudflare:workers';
import { isOrganizer } from '../../../server/admin.js';
export async function GET(request) {
  if (!isOrganizer(request)) return Response.json({ error: 'Solo el organizador puede consultar las respuestas.' }, { status: 403 });
  const { results } = await env.DB.prepare('SELECT id, name, attendance, guests, dietary, message, submitted_at, updated_at FROM confirmations ORDER BY updated_at DESC').all();
  return Response.json({ confirmations: results }, { headers: { 'Cache-Control': 'no-store' } });
}
