import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';
import { videos } from '../data';
import { Modal, Reveal } from './Shared';
export default function VideoSection() {
  const [selected, setSelected] = useState(null);
  return <section id="video" className="video-section section-pad"><div className="section-container video-layout"><Reveal className="video-copy"><p className="eyebrow">UN PEDACITO DE MAGIA</p><Sparkles className="video-sparkle" size={30} strokeWidth={1} /><h2>Hay sueños<br />que merecen<br /><em>una celebración.</em></h2><p>Y este es uno de ellos. Cada detalle, cada ilusión y cada sonrisa nos acercan a una noche inolvidable.</p><span className="handwritten">¿Lo soñamos juntos?</span></Reveal><div className="video-list">{videos.map((video, i) => <Reveal key={video.src || video.youtubeId} delay={0.15}><motion.button type="button" className="video-cover" onClick={() => setSelected(i)} aria-label={`Reproducir: ${video.title}`} whileTap={{ scale: 0.99 }}><img src={video.poster} alt={video.posterAlt} loading="lazy" /><span className="video-overlay" /><span className="play-circle"><Play size={22} fill="currentColor" /></span><span className="video-cover-caption"><span>LA ILUSIÓN DE MIS XV</span><strong>{video.title}</strong></span></motion.button><p className="media-note">{video.caption}</p></Reveal>)}</div></div>
    <AnimatePresence>{selected !== null && <Modal label={videos[selected].title} className="video-modal" onClose={() => setSelected(null)}>{videos[selected].type === 'youtube' ? <iframe src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videos[selected].youtubeId)}?autoplay=1`} title={videos[selected].title} allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen /> : <video controls autoPlay playsInline preload="metadata" src={videos[selected].src} aria-label={videos[selected].title} />}<p>{videos[selected].title}</p></Modal>}</AnimatePresence>
  </section>;
}
