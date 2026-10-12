import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Sparkles, Flower2 } from 'lucide-react';
import { invitation, eventDisplay, copy } from '../data';
import { Divider, Reveal } from './Shared';
export default function Hero() {
  const reduced = useReducedMotion();
  return <section className="hero" id="inicio" aria-label="Portada de la invitación">
    <div className="hero-copy">
      <motion.div className="hero-intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
        <p className="eyebrow"><span className="tiny-line" />{copy.heroEyebrow.toUpperCase()}<span className="tiny-line" /></p>
        <div className="hero-name-wrap"><span className="hero-xv" aria-hidden="true">XV</span><p className="hero-pretitle">{copy.heroPretitle}</p><h1>{invitation.name}</h1></div>
        <p className="hero-subtitle">{copy.heroLines[0]}<br />{copy.heroLines[1]}</p>
        <Divider />
        <p className="hero-date"><span>{eventDisplay.weekday.toUpperCase()}</span><strong>{eventDisplay.day}</strong><span>{eventDisplay.month.toUpperCase()}<br /><small>{invitation.year}</small></span></p>
        <motion.a href="#cuenta-regresiva" className="button button-primary" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>Abrir invitación <ArrowUpRight size={17} /></motion.a>
        <p className="hero-note">Con mucho cariño, para ti.</p>
      </motion.div>
      <a className="scroll-cue" href="#cuenta-regresiva"><ArrowDown size={14} />DESLIZA PARA DESCUBRIR</a>
      <Flower2 className="hero-flower flower-one" aria-hidden="true" size={180} strokeWidth={0.4} />
      <Flower2 className="hero-flower flower-two" aria-hidden="true" size={150} strokeWidth={0.4} />
    </div>
    <div className="hero-visual">
      <motion.img className="hero-photo" src={invitation.heroImage} alt={invitation.heroImageAlt} style={{ objectPosition: invitation.heroImagePosition }} fetchPriority="high" initial={{ scale: reduced ? 1 : 1.06, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5 }} />
      <div className="photo-frame" aria-hidden="true" />
      <div className="photo-top"><Sparkles size={15} /><span>EL COMIENZO DE ALGO BONITO</span></div>
      <Reveal className="photo-caption"><span className="caption-line" /><p>Un día para soñar.<br /><em>Una noche para recordar.</em></p><span className="caption-small">{invitation.name.toUpperCase()} · MIS XV</span></Reveal>
      <div className="hero-seal" aria-hidden="true"><span>CON AMOR</span><span className="seal-r">{invitation.name[0]}</span><span>{invitation.dateShort}</span></div>
    </div>
  </section>;
}
