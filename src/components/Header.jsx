import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navigation, invitation } from '../data';
export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('inicio');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }), { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    navigation.forEach(([, id]) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const handle = e => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, []);
  return <header className="header">
    <div className="header-inner">
      <a href="#inicio" className="brand" aria-label={`${invitation.name}, inicio`} onClick={() => setOpen(false)}><span className="brand-letter">{invitation.name[0]}</span><span className="brand-divider" /><span className="brand-text">MIS XV<br /><small>{invitation.year}</small></span></a>
      <nav className="desktop-nav" aria-label="Navegación principal">{navigation.slice(0, 6).map(([label, id]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{label}</a>)}</nav>
      <a className="header-rsvp" href="#rsvp">Confirmar asistencia <ArrowUpRight size={15} /></a>
      <button className="mobile-toggle icon-button" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(!open)}>{open ? <X size={21} /> : <Menu size={21} />}</button>
    </div>
    <AnimatePresence>{open && <motion.nav id="mobile-nav" className="mobile-nav" aria-label="Navegación móvil" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>{navigation.map(([label, id], i) => <a href={`#${id}`} key={id} onClick={() => setOpen(false)}><span>0{i + 1}</span>{label}<ArrowUpRight size={16} /></a>)}</motion.nav>}</AnimatePresence>
    <motion.div className="reading-progress" style={{ scaleX }} />
  </header>;
}
