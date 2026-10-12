import { env } from 'cloudflare:workers';
import { parseConfirmation } from '../../../server/rsvp.js';
export async function POST(request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return Response.json({ error: 'Origen no permitido.' }, { status: 403 });
  if (Number(request.headers.get('content-length')) > 8192) return Response.json({ error: 'Respuesta demasiado grande.' }, { status: 413 });
  let input;
  try { const body = await request.text(); if (body.length > 8192) throw new Error(); input = parseConfirmation(JSON.parse(body)); }
  catch { return Response.json({ error: 'Revisa el nombre, asistencia y acompañantes.' }, { status: 400 }); }
  if (!env.DB) return Response.json({ error: 'El servicio no está disponible. Intenta nuevamente.' }, { status: 503 });
  const now = new Date().toISOString();
  try {
    if (input.id) {
      const result = await env.DB.prepare('UPDATE confirmations SET name=?, attendance=?, guests=?, dietary=?, message=?, updated_at=? WHERE id=? AND edit_token=?').bind(input.name, input.attendance, input.guests, input.dietary, input.message, now, input.id, input.editToken).run();
      if (!result.meta.changes) return Response.json({ error: 'No pudimos verificar tu respuesta para editarla.' }, { status: 403 });
      return Response.json({ id: input.id, editToken: input.editToken }, { headers: { 'Cache-Control': 'no-store' } });
    }
    const id = crypto.randomUUID(), editToken = crypto.randomUUID();
    await env.DB.prepare('INSERT INTO confirmations (id, edit_token, name, attendance, guests, dietary, message, submitted_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)').bind(id, editToken, input.name, input.attendance, input.guests, input.dietary, input.message, now, now).run();
    return Response.json({ id, editToken }, { status: 201, headers: { 'Cache-Control': 'no-store' } });
  } catch (error) { console.error('RSVP storage failed', error); return Response.json({ error: 'No pudimos guardar tu respuesta. Intenta nuevamente.' }, { status: 503 }); }
}
