import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';

export function Reveal({ children, className = '', delay = 0, ...props }) {
  const reduced = useReducedMotion();
  return <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] }} className={className} {...props}>{children}</motion.div>;
}
export function Divider() { return <div className="ornament" aria-hidden="true"><span />✧<span /></div>; }
export function SectionTitle({ eyebrow, title, description, light = false }) {
  return <Reveal className={`section-heading ${light ? 'light' : ''}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{description && <p className="section-description">{description}</p>}<Divider /></Reveal>;
}
export function Modal({ children, onClose, label, className = '', onKeyDown }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);
  return <dialog ref={ref} className={`modal ${className}`} aria-label={label} onCancel={e => { e.preventDefault(); onClose(); }} onKeyDown={onKeyDown} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <motion.div className="modal-inner" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.22 }}>
      <button autoFocus type="button" className="modal-close icon-button" aria-label="Cerrar" onClick={onClose}><X size={24} /></button>{children}
    </motion.div>
  </dialog>;
}
