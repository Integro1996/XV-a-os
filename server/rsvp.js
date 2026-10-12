export function parseConfirmation(value) {
  if (!value || typeof value.name !== 'string' || value.name.trim().length < 3 || value.name.trim().length > 120 || !['yes', 'no'].includes(value.attendance)) throw new Error('Invalid confirmation');
  const guests = value.attendance === 'yes' ? Number(value.guests) : 0;
  if (!Number.isInteger(guests) || guests < 0 || guests > 5) throw new Error('Invalid guests');
  for (const [key, max] of [['dietary', 300], ['message', 600]]) if (value[key] != null && (typeof value[key] !== 'string' || value[key].length > max)) throw new Error('Invalid text');
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if ((value.id || value.editToken) && (!uuid.test(value.id || '') || !uuid.test(value.editToken || ''))) throw new Error('Invalid edit credential');
  return { name: value.name.trim(), attendance: value.attendance, guests, dietary: value.attendance === 'yes' ? (value.dietary || '').trim() : '', message: (value.message || '').trim(), id: value.id, editToken: value.editToken };
}
