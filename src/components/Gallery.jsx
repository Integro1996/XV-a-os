import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { photos, invitation, copy } from '../data';
import { Modal, Reveal, SectionTitle } from './Shared';
export function LightboxModal({ index, setIndex, onClose }) {
  const touch = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  const navigate = offset => { setZoomed(false); setIndex((index + offset + photos.length) % photos.length); };
  return <Modal label="Galería de fotos a pantalla completa" className="lightbox" onClose={onClose} onKeyDown={e => { if (e.key === 'ArrowRight') { e.preventDefault(); navigate(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); navigate(-1); } }}>
    <div className="lightbox-top"><span>{invitation.name.toUpperCase()} · MIS XV</span><button className="icon-button" type="button" onClick={() => setZoomed(!zoomed)} aria-label={zoomed ? 'Reducir foto' : 'Ampliar foto'}>{zoomed ? <ZoomOut /> : <ZoomIn />}</button></div>
    <div className={`lightbox-image-area ${zoomed ? 'zoomed' : ''}`} onTouchStart={e => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }} onTouchEnd={e => { if (!touch.current || zoomed) return; const dx = e.changedTouches[0].clientX - touch.current.x; const dy = e.changedTouches[0].clientY - touch.current.y; if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) navigate(dx < 0 ? 1 : -1); touch.current = null; }}>
      <AnimatePresence mode="wait"><motion.img key={index} src={photos[index].src} alt={photos[index].alt} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} /></AnimatePresence>
    </div>
    <button className="lightbox-prev icon-button" type="button" aria-label="Foto anterior" onClick={() => navigate(-1)}><ChevronLeft size={26} /></button>
    <button className="lightbox-next icon-button" type="button" aria-label="Foto siguiente" onClick={() => navigate(1)}><ChevronRight size={26} /></button>
    <div className="lightbox-bottom"><p>{photos[index].label}</p><span>{index + 1} / {photos.length}</span><small>Desliza o usa las flechas para explorar</small></div>
  </Modal>;
}
export default function Gallery() {
  const [index, setIndex] = useState(null);
  return <section id="galeria" className="gallery-section section-pad">
    <div className="section-container">
      <SectionTitle eyebrow="MI HISTORIA, EN INSTANTES" title={copy.galleryTitle} description={copy.galleryDescription} />
      <div className="gallery-grid">{photos.map((photo, i) => <Reveal className={`gallery-item gallery-item-${i}`} key={i} delay={i * 0.08}><motion.button type="button" className="photo-button" onClick={() => setIndex(i)} aria-label={`Abrir foto ${i + 1}: ${photo.label}`} whileTap={{ scale: 0.98 }}><img src={photo.src} alt={photo.alt} loading="lazy" style={{ objectPosition: photo.position }} /><span className="photo-shade" /><span className="gallery-number">0{i + 1}</span><span className="gallery-caption">{photo.label}<ArrowUpRight size={19} /></span><span className="gallery-expand"><ZoomIn size={19} /></span></motion.button></Reveal>)}</div>
      <p className="gallery-hint"><ZoomIn size={13} /> Toca una foto y descubre cada detalle</p>
    </div>
    <AnimatePresence>{index !== null && <LightboxModal index={index} setIndex={setIndex} onClose={() => setIndex(null)} />}</AnimatePresence>
  </section>;
}
