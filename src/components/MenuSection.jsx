import { Flower2, Utensils, CakeSlice, Wine } from 'lucide-react';
import { menu } from '../data';
import { Reveal, SectionTitle } from './Shared';
const icons = { starter: Flower2, main: Utensils, dessert: CakeSlice, drinks: Wine };
export default function MenuSection() {
  return <section id="menu" className="menu-section section-pad"><div className="section-container"><SectionTitle eyebrow="UNA EXPERIENCIA PARA DISFRUTAR" title="A la mesa, con amor" description="Sabores especiales para acompañar una noche que recordaremos siempre." /><Reveal className="menu-card"><span className="menu-corner corner-tl" /><span className="menu-corner corner-tr" /><span className="menu-corner corner-bl" /><span className="menu-corner corner-br" /><div className="menu-card-heading"><Flower2 size={28} strokeWidth={1} /><span>EL MENÚ</span><p>Bon appétit</p></div><div className="menu-grid">{menu.map((item, i) => { const Icon = icons[item.icon]; return <Reveal key={item.course} className="menu-course" delay={i * 0.08}><Icon size={24} strokeWidth={1} /><p className="eyebrow">{item.course}</p><h3>{item.title}</h3><p>{item.description}</p></Reveal>; })}</div><p className="menu-footnote">¿Alguna alergia o preferencia? Cuéntanos al confirmar tu asistencia.</p></Reveal></div></section>;
}
