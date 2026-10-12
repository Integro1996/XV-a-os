import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getCountdown, validateRSVP, submitRSVP } from '../src/utils.js';

test('countdown respects Mexico UTC offset and separates units', () => {
  assert.deepEqual(getCountdown('2026-12-19T18:00:00-06:00', Date.parse('2026-12-18T22:58:59Z')), { days: 1, hours: 1, minutes: 1, seconds: 1, expired: false });
});
test('past and invalid dates cannot produce negative or NaN counters', () => {
  for (const date of ['2020-01-01T00:00:00Z', 'invalid']) assert.deepEqual(getCountdown(date), { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
});
test('RSVP validates required name, attendance, and guest limits', () => {
  assert.equal(Object.keys(validateRSVP({ name: '  ', attendance: '', guests: '0' })).length, 2);
  assert.ok(validateRSVP({ name: 'Ana López', attendance: 'yes', guests: '6' }).guests);
  assert.ok(validateRSVP({ name: 'Ana López', attendance: 'yes', guests: '1.5' }).guests);
  assert.deepEqual(validateRSVP({ name: 'Ana López', attendance: 'yes', guests: '2' }), {});
});
test('demo saves locally and declined responses always have zero guests', async () => {
  let stored;
  globalThis.localStorage = { setItem: (_key, value) => { stored = JSON.parse(value); } };
  const result = await submitRSVP({ name: ' Ana López ', attendance: 'no', guests: '4' }, '');
  assert.equal(result.mode, 'demo');
  assert.equal(stored.name, 'Ana López');
  assert.equal(stored.guests, 0);
  assert.equal(stored.attendance, 'no');
  delete globalThis.localStorage;
});
test('configured RSVP sends JSON and reports service failures', async () => {
  const originalFetch = globalThis.fetch;
  try {
    let request;
    globalThis.fetch = async (url, options) => { request = { url, options }; return { ok: true, json: async () => ({ id: 'test', editToken: 'token' }) }; };
    const result = await submitRSVP({ name: 'Ana López', attendance: 'yes', guests: '2' }, 'https://example.com/rsvp');
    assert.equal(result.mode, 'remote');
    assert.equal(request.options.method, 'POST');
    assert.equal(JSON.parse(request.options.body).guests, 2);
    globalThis.fetch = async () => ({ ok: false });
    await assert.rejects(() => submitRSVP({ name: 'Ana López', attendance: 'yes', guests: '0' }, 'https://example.com/rsvp'), /No pudimos enviar/);
  } finally { globalThis.fetch = originalFetch; }
});
