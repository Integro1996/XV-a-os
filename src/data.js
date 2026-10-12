// Edita aquí el contenido. Las fotos, el menú y los lugares son ejemplos.
export const EVENT_DATE = '2026-12-19T18:00:00-06:00';
const eventDate = new Date(EVENT_DATE);
const format = options => new Intl.DateTimeFormat('es-MX', { timeZone: 'America/Mexico_City', ...options }).format(eventDate);
export const eventDisplay = { day: format({ day: 'numeric' }), month: format({ month: 'long' }), weekday: format({ weekday: 'long' }), year: format({ year: 'numeric' }), monthNumber: format({ month: '2-digit' }) };
export const copy = {
  heroEyebrow: 'Una noche. Mil recuerdos.', heroPretitle: 'Mis quince años',
  heroLines: ['Un sueño que florece.', 'Una historia que comienza.'],
  galleryTitle: 'Pequeños momentos, grandes sueños', galleryDescription: 'Un poquito de mí, antes de vivir esta noche contigo.',
  countdownTitle: 'La magia está por comenzar',
  closingLines: ['Una noche especial,', 'porque estarás tú.'],
};
export const invitation = {
  name: 'Regina',
  fullName: 'Regina Fernanda',
  dateLabel: format({ day: 'numeric', month: 'long', year: 'numeric' }),
  dateShort: `${eventDisplay.day} · ${eventDisplay.monthNumber} · ${eventDisplay.year}`,
  year: eventDisplay.year,
  city: 'Ciudad de México',
  heroImage: '/images/portrait.png',
  intro: 'Hay momentos que se guardan para siempre. Este es el mío, y quiero compartirlo contigo.',
  closing: 'Los mejores recuerdos comienzan con las personas que más queremos.',
  rsvpDeadline: '1 de diciembre',
  // Agrega una URL HTTPS para enviar confirmaciones a tu backend. Vacío = demo local.
  rsvpEndpoint: '/api/rsvp',
  dressCode: { title: 'Elegancia para celebrar', type: 'Vestimenta formal', description: 'Vestido largo o traje formal. El color azul está reservado para la quinceañera; por favor elige otro color.', colors: ['#2f2928', '#7a3e4d', '#b99a6a', '#8a6a54'] },
};
export const photos = [
  { src: '/images/portrait.png', alt: 'Retrato ilustrativo con vestido rosa en un jardín', label: 'Un nuevo capítulo', position: '50% 28%' },
  { src: '/images/flowers.svg', alt: 'Ilustración de flores en tonos rosa y marfil', label: 'La belleza de los detalles', position: '50% 50%' },
  { src: '/images/portrait.png', alt: 'Detalle del vestido de gala rosa, imagen de ejemplo', label: 'Un vestido, mil sueños', position: '50% 78%' },
  { src: '/images/portrait.png', alt: 'Una tarde en el jardín, retrato ilustrativo', label: 'Así comienza mi historia', position: '50% 12%' },
];
export const videos = [
  // Puedes usar { type: 'youtube', youtubeId: 'ID', ... } en lugar de un archivo local.
  { type: 'local', src: '/videos/momento.mp4', poster: '/images/flowers.svg', title: 'La magia está en los pequeños momentos', description: 'Un pequeño adelanto de la inspiración para esta noche.', caption: 'Video de muestra · reemplázalo con tu video favorito' },
];
export const menu = [
  { course: 'Para comenzar', title: 'Crema de flores de calabaza', description: 'Con un toque de queso de cabra y crujiente de parmesano', icon: 'starter' },
  { course: 'El plato principal', title: 'Pollo en salsa de almendras', description: 'Acompañado de puré rústico y vegetales de temporada', icon: 'main' },
  { course: 'Un final dulce', title: 'Delicia de frutos rojos', description: 'Mousse de vainilla, frutos del bosque y un toque de magia', icon: 'dessert' },
  { course: 'Para brindar', title: 'Un brindis por los sueños', description: 'Mocktails de frutos rojos, aguas frescas y refrescos', icon: 'drinks' },
];
export const events = [
  { name: 'La ceremonia', time: '18:00 h', place: 'Parroquia de San Jacinto', address: 'Plaza San Jacinto 18, San Ángel, CDMX', mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Parroquia+de+San+Jacinto+San+Angel+CDMX', icon: 'church' },
  { name: 'La celebración', time: '19:30 h', place: 'Jardín de los Sueños', address: 'Lugar de ejemplo · dirección por confirmar', mapsUrl: '', icon: 'party' },
];
export const navigation = [
  ['Inicio', 'inicio'], ['Galería', 'galeria'], ['Video', 'video'], ['Menú', 'menu'], ['Evento', 'evento'], ['Dress code', 'vestimenta'], ['RSVP', 'rsvp'],
];
