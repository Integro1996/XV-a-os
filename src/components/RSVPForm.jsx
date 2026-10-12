import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Heart, LoaderCircle } from 'lucide-react';
import { invitation } from '../data';
import { validateRSVP, submitRSVP } from '../utils';
import { Reveal, SectionTitle } from './Shared';
const initialValues = { name: '', attendance: '', guests: '0', dietary: '', message: '' };
export default function RSVPForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [failure, setFailure] = useState('');
  const update = e => { setValues({ ...values, [e.target.name]: e.target.value }); setErrors({ ...errors, [e.target.name]: undefined }); };
  const submit = async e => {
    e.preventDefault();
    const validation = validateRSVP(values);
    setErrors(validation); setFailure('');
    if (Object.keys(validation).length) { const field = document.getElementById(`rsvp-${Object.keys(validation)[0]}`); field?.focus(); return; }
    setSubmitting(true);
    try { setResult(await submitRSVP(values, invitation.rsvpEndpoint)); }
    catch (error) { setFailure(error.message || 'No pudimos guardar tu respuesta. Inténtalo de nuevo.'); }
    finally { setSubmitting(false); }
  };
  return <section id="rsvp" className="rsvp-section section-pad"><div className="section-container"><SectionTitle eyebrow="CONFIRMA TU ASISTENCIA" title="¿Me acompañas?" description={`Tu presencia hará esta noche todavía más especial. Por favor confirma antes del ${invitation.rsvpDeadline}.`} /><Reveal className="rsvp-card">{result ? <motion.div className="rsvp-success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} role="status"><span className="success-icon"><Check size={30} /></span><h3>{result.mode === 'demo' ? '¡Tu respuesta de prueba está lista!' : '¡Gracias por tu respuesta!'}</h3><p>{values.attendance === 'yes' ? `Será maravilloso celebrar contigo, ${values.name.trim()}.` : `Gracias por compartir tu respuesta, ${values.name.trim()}. Te llevamos en el corazón.`}</p>{result.mode === 'demo' && <p className="demo-success">Guardada solo en este navegador. Esta demostración no envía tu confirmación al organizador.</p>}<button type="button" className="button button-outline" onClick={() => setResult(null)}>Editar mi respuesta<ArrowUpRight size={15} /></button></motion.div> : <form onSubmit={submit} noValidate>
      <div className="form-field"><label htmlFor="rsvp-name">Nombre completo <span>*</span></label><input id="rsvp-name" name="name" autoComplete="name" placeholder="Escribe tu nombre y apellidos" value={values.name} onChange={update} maxLength={120} required aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />{errors.name && <p className="field-error" id="name-error">{errors.name}</p>}</div>
      <fieldset className="attendance-field" id="rsvp-attendance" tabIndex={-1} aria-describedby={errors.attendance ? 'attendance-error' : undefined}><legend>¿Podrás acompañarnos? <span>*</span></legend><div className="attendance-options">{[['yes', '¡Sí, ahí estaré!'], ['no', 'No podré asistir']].map(([value, label]) => <label className={`attendance-option ${values.attendance === value ? 'selected' : ''}`} key={value}><input type="radio" name="attendance" value={value} checked={values.attendance === value} onChange={update} required /><span>{value === 'yes' ? <Heart size={15} /> : <span className="option-dot" />}{label}</span>{values.attendance === value && <Check size={14} />}</label>)}</div>{errors.attendance && <p className="field-error" id="attendance-error">{errors.attendance}</p>}</fieldset>
      {values.attendance === 'yes' && <motion.div className="form-field" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}><label htmlFor="rsvp-guests">Número de acompañantes</label><select id="rsvp-guests" name="guests" value={values.guests} onChange={update} aria-invalid={!!errors.guests} aria-describedby="guests-hint">{Array.from({ length: 6 }, (_, n) => <option key={n} value={n}>{n === 0 ? 'Solo yo' : `${n} ${n === 1 ? 'acompañante' : 'acompañantes'}`}</option>)}</select><small id="guests-hint">Además de ti, hasta 5 personas.</small>{errors.guests && <p className="field-error">{errors.guests}</p>}</motion.div>}
      {values.attendance !== 'no' && <div className="form-field"><label htmlFor="rsvp-dietary">Restricciones alimenticias <small>(opcional)</small></label><input id="rsvp-dietary" name="dietary" placeholder="Alergias o preferencias" value={values.dietary} onChange={update} maxLength={300} /></div>}
      <div className="form-field"><label htmlFor="rsvp-message">Un mensaje para {invitation.name} <small>(opcional)</small></label><textarea id="rsvp-message" name="message" placeholder="Déjame unas palabras bonitas…" value={values.message} onChange={update} rows={2} maxLength={600} /></div>
      {!invitation.rsvpEndpoint && <p className="demo-notice">Modo demostración: tu respuesta se guardará en este navegador y no se enviará al organizador.</p>}
      {failure && <p className="field-error" role="alert">{failure}</p>}
      <motion.button className="button button-primary form-submit" type="submit" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} disabled={submitting}>{submitting ? <><LoaderCircle size={17} className="spinner" />Guardando respuesta…</> : <>{invitation.rsvpEndpoint ? 'Confirmar mi respuesta' : 'Guardar respuesta de prueba'}<ArrowUpRight size={17} /></>}</motion.button><p className="form-footnote"><Heart size={11} /> Gracias por ser parte de mi historia.</p>
    </form>}</Reveal></div></section>;
}
