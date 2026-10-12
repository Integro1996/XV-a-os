'use client';
import { useState, useEffect } from 'react';
export default function Admin() {
  const [rows, setRows] = useState([]), [error, setError] = useState(''), [loading, setLoading] = useState(true);
  async function refresh() { setLoading(true); setError(''); try { const response = await fetch('/api/confirmations', { cache: 'no-store' }); if (!response.ok) throw new Error(response.status === 403 ? 'Accede con la cuenta del organizador para ver las confirmaciones.' : 'No pudimos cargar las respuestas.'); setRows((await response.json()).confirmations); } catch (e) { setError(e.message); } finally { setLoading(false); } }
  useEffect(() => { refresh(); }, []);
  function download() {
    const columns = ['name', 'attendance', 'guests', 'dietary', 'message', 'submitted_at', 'updated_at'];
    const cell = value => '"' + String(value ?? '').replace(/^[=+@-]/, "'$&").replaceAll('"', '""') + '"';
    const content = '\ufeff' + [['Nombre', 'Asistencia', 'Acompañantes', 'Alimentación', 'Mensaje', 'Registro', 'Actualización'], ...rows.map(row => columns.map(key => key === 'attendance' ? (row[key] === 'yes' ? 'Sí' : 'No') : row[key]))].map(row => row.map(cell).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([content], { type: 'text/csv;charset=utf-8' })); const link = document.createElement('a'); link.href = url; link.download = 'confirmaciones-regina.csv'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const attending = rows.filter(row => row.attendance === 'yes');
  return <main style={{ padding: '40px 20px', maxWidth: 1200, margin: 'auto' }}><a href="/">Volver a la invitación</a><h1>Confirmaciones de Regina</h1>{error ? <p role="alert">{error} <a href="/signin-with-chatgpt?return_to=/admin" target="_top">Iniciar sesión</a></p> : <><p>{rows.length} respuestas · {attending.length} confirmados · {attending.reduce((sum, row) => sum + 1 + row.guests, 0)} personas en total</p><button className="button button-outline" onClick={refresh} disabled={loading}>Actualizar</button> <button className="button button-primary" onClick={download} disabled={!rows.length}>Descargar CSV</button>{loading && <p role="status">Cargando respuestas…</p>}<div style={{ overflowX: 'auto', marginTop: 24 }}><table style={{ width: '100%', borderCollapse: 'collapse' }}><thead><tr>{['Nombre', 'Asiste', 'Acompañantes', 'Alimentación', 'Mensaje', 'Actualizada'].map(label => <th key={label} style={{ textAlign: 'left', padding: 12 }}>{label}</th>)}</tr></thead><tbody>{rows.map(row => <tr key={row.id}>{[row.name, row.attendance === 'yes' ? 'Sí' : 'No', row.guests, row.dietary, row.message, new Date(row.updated_at).toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })].map((value, index) => <td key={index} style={{ padding: 12, borderTop: '1px solid #ded3ca', minWidth: 100 }}>{value}</td>)}</tr>)}</tbody></table>{!loading && !rows.length && <p>Aún no hay confirmaciones.</p>}</div></>}</main>;
}
