export function getCountdown(date, now = Date.now()) {
  const target = new Date(date).getTime();
  if (!Number.isFinite(target)) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  const diff = Math.max(0, target - now);
  return { days: Math.floor(diff / 86400000), hours: Math.floor(diff / 3600000) % 24, minutes: Math.floor(diff / 60000) % 60, seconds: Math.floor(diff / 1000) % 60, expired: diff === 0 };
}
export function validateRSVP(values) {
  const errors = {};
  if (values.name.trim().length < 3) errors.name = 'Escribe tu nombre completo (al menos 3 caracteres).';
  if (!['yes', 'no'].includes(values.attendance)) errors.attendance = 'Selecciona si podrás acompañarnos.';
  if (values.attendance === 'yes' && (!Number.isInteger(Number(values.guests)) || Number(values.guests) < 0 || Number(values.guests) > 5)) errors.guests = 'Selecciona de 0 a 5 acompañantes.';
  return errors;
}
export async function submitRSVP(values, endpoint) {
  const payload = { ...values, name: values.name.trim(), guests: values.attendance === 'yes' ? Number(values.guests) : 0, submittedAt: new Date().toISOString() };
  if (endpoint) {
    try {
      const saved = JSON.parse(localStorage.getItem('regina-xv-receipt') || 'null');
      if (saved?.id && saved?.editToken) { payload.id = saved.id; payload.editToken = saved.editToken; }
    } catch { /* Storage may be unavailable; submitting still works. */ }
    const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!response.ok) throw new Error('No pudimos enviar tu respuesta. Inténtalo de nuevo.');
    const receipt = await response.json();
    if (!receipt.id || !receipt.editToken) throw new Error('No pudimos verificar que la respuesta se guardó. Inténtalo de nuevo.');
    try { localStorage.setItem('regina-xv-receipt', JSON.stringify(receipt)); } catch { /* Confirmation is already stored on the server. */ }
    return { mode: 'remote', payload };
  }
  // Demo: solo se guarda en este navegador, no se envía al organizador.
  localStorage.setItem('regina-xv-rsvp', JSON.stringify(payload));
  return { mode: 'demo', payload };
}
