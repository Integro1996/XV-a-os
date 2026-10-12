import { ArrowUpRight, Heart } from 'lucide-react';
import { invitation, copy } from '../data';
import { Reveal, Divider } from './Shared';
export default function ClosingSection() {
  return <><section className="closing-section"><img src="/images/fotosdexv/img1.JPG" alt="Regina en pose de ballet frente al Ángel de la Independencia" loading="lazy" /><div className="closing-shade" /><Reveal className="closing-copy"><p className="eyebrow">LO MEJOR ESTÁ POR VENIR</p><h2>{copy.closingLines[0]}<br /><em>{copy.closingLines[1]}</em></h2><p>{invitation.closing}</p><Divider /><span className="closing-signature">Con amor, {invitation.name}</span><a href="#rsvp" className="button button-light">Quiero ser parte<ArrowUpRight size={16} /></a></Reveal></section><footer className="footer"><a href="#inicio" className="footer-monogram" aria-label="Volver al inicio">{invitation.name[0]}</a><p>{invitation.name.toUpperCase()} · MIS XV AÑOS</p><span>{invitation.dateLabel}</span><div className="footer-bottom"><small>Una invitación hecha con <Heart size={11} /></small><small>19 · 12 · 2026</small></div></footer></>;
}
