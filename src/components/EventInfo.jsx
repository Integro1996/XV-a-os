import { motion } from 'framer-motion';
import { Church, PartyPopper, MapPin, ArrowUpRight, CalendarDays, Clock3 } from 'lucide-react';
import { events, EVENT_DATE } from '../data';
import { Reveal, SectionTitle } from './Shared';
function downloadCalendar() {
  const start = new Date(EVENT_DATE);
  const end = new Date(start.getTime() + 6 * 3600000);
  const stamp = date => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const content = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Regina XV//Invitacion//ES', 'BEGIN:VEVENT', 'UID:regina-xv-2026@invitation.local', `DTSTAMP:${stamp(new Date())}`, `DTSTART:${stamp(start)}`, `DTEND:${stamp(end)}`, 'SUMMARY:Mis XV de Regina', 'DESCRIPTION:Una noche para recordar. Consulta la invitación para confirmar los lugares.', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const url = URL.createObjectURL(new Blob([content], { type: 'text/calendar;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = 'regina-mis-xv.ics'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export default function EventInfo() {
  return <section id="evento" className="event-section section-pad"><div className="section-container"><SectionTitle eyebrow="EL LUGAR DE NUESTRO ENCUENTRO" title="Nos vemos donde nace la magia" description="Dos momentos especiales. Un mismo deseo: tenerte cerca." /><div className="event-grid">{events.map((event, i) => { const Icon = event.icon === 'church' ? Church : PartyPopper; return <Reveal className="event-card" key={event.name} delay={i * 0.12}><span className="event-index">0{i + 1}</span><Icon size={38} strokeWidth={1} /><p className="eyebrow">{event.name}</p><h3>{event.place}</h3><p className="event-time"><Clock3 size={14} />{event.time}</p><p className="event-address"><MapPin size={14} />{event.address}</p>{event.mapsUrl ? <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="button button-outline" href={event.mapsUrl} target="_blank" rel="noopener noreferrer">Cómo llegar<ArrowUpRight size={16} /></motion.a> : <span className="location-pending">Ubicación por confirmar</span>}</Reveal>; })}</div><Reveal className="calendar-row"><CalendarDays size={17} /><span>Hazle un espacio a esta noche especial.</span><button type="button" className="text-link" onClick={downloadCalendar}>Agregar a mi calendario<ArrowUpRight size={14} /></button></Reveal></div></section>;
}
