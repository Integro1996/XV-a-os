import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseConfirmation } from '../server/rsvp.js';
import { isOrganizer } from '../server/admin.js';
test('server rejects invalid payloads and clears guests on declined invitations', () => {
  const valid = { name: ' Ana López ', attendance: 'yes', guests: 2, dietary: 'Sin nueces', message: 'Gracias' };
  assert.equal(parseConfirmation(valid).name, 'Ana López');
  assert.equal(parseConfirmation({ ...valid, attendance: 'no', guests: 5 }).guests, 0);
  for (const change of [{ name: 123 }, { attendance: 'maybe' }, { guests: 6 }, { guests: 1.5 }, { message: 'x'.repeat(601) }, { id: 'invalid', editToken: 'invalid' }]) assert.throws(() => parseConfirmation({ ...valid, ...change }));
});
test('only organizer identity can read confirmations', () => {
  assert.equal(isOrganizer(new Request('https://example.com')), false);
  assert.equal(isOrganizer(new Request('https://example.com', { headers: { 'oai-authenticated-user-email': 'guest@example.com' } })), false);
  assert.equal(isOrganizer(new Request('https://example.com', { headers: { 'oai-authenticated-user-email': 'albertoafm96@gmail.com' } })), true);
});
