import { useEffect, useState } from 'react';
import { EVENT_DATE, invitation, copy, eventDisplay } from '../data';
import { getCountdown } from '../utils';
import { Reveal, SectionTitle } from './Shared';
export default function Countdown() {
  const [remaining, setRemaining] = useState(() => getCountdown(EVENT_DATE));
  useEffect(() => { const timer = setInterval(() => setRemaining(getCountdown(EVENT_DATE)), 1000); return () => clearInterval(timer); }, []);
  return <section id="cuenta-regresiva" className="countdown-section section-pad">
    <svg className="watermark" aria-hidden="true" viewBox="0 0 450 350"><text x="0" y="280" fontFamily="Cormorant Garamond, serif" fontSize="350">XV</text></svg>
    <SectionTitle eyebrow="GUARDA LA FECHA" title={remaining.expired ? '¡Llegó el gran día!' : copy.countdownTitle} description={invitation.intro} />
    <Reveal className="countdown" role="timer" aria-label="Tiempo restante para el evento">{[['days', 'Días'], ['hours', 'Horas'], ['minutes', 'Minutos'], ['seconds', 'Segundos']].map(([key, label]) => <div className="countdown-unit" key={key}><span className="countdown-number">{String(remaining[key]).padStart(2, '0')}</span><span className="countdown-label">{label}</span></div>)}</Reveal>
    <Reveal className="countdown-date"><span>{eventDisplay.day} DE {eventDisplay.month.toUpperCase()}</span><span className="date-dot">✧</span><span>{invitation.city.toUpperCase()}</span></Reveal>
  </section>;
}
