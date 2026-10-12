// Edita aquí el contenido de la invitación.
export const EVENT_DATE = '2026-12-19T20:00:00-06:00';
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
  city: 'Veracruz, Ver.',
  heroImage: '/images/fotosdexv/img5.JPG',
  heroImageAlt: 'Regina posando en puntas frente al Ángel de la Independencia',
  heroImagePosition: '50% 46%',
  intro: 'Hay momentos que se guardan para siempre. Este es el mío, y quiero compartirlo contigo.',
  closing: 'Los mejores recuerdos comienzan con las personas que más queremos.',
  rsvpDeadline: '1 de diciembre',
  // Agrega una URL HTTPS para enviar confirmaciones a tu backend. Vacío = demo local.
  rsvpEndpoint: '/api/rsvp',
  dressCode: { title: 'Elegancia para celebrar', type: 'Vestimenta formal', description: 'Vestido largo o traje formal. El color azul está reservado para la quinceañera; por favor elige otro color.', colors: ['#2f2928', '#7a3e4d', '#b99a6a', '#8a6a54'] },
};
export const photos = [
  { src: '/images/fotosdexv/img3.JPG', alt: 'Regina bailando en una calle arbolada', label: 'El arte de soñar', position: '50% 42%' },
  { src: '/images/fotosdexv/img1.JPG', alt: 'Regina en pose de ballet frente al Ángel de la Independencia', label: 'Un nuevo capítulo', position: '50% 48%' },
  { src: '/images/fotosdexv/img2.JPG', alt: 'Regina realizando una pose de ballet entre los árboles', label: 'Sin miedo a volar', position: '50% 36%' },
  { src: '/images/fotosdexv/img4.JPG', alt: 'Regina bailando en Paseo de la Reforma', label: 'Instantes de luz', position: '50% 45%' },
  { src: '/images/fotosdexv/img5.JPG', alt: 'Regina posando en puntas frente al Ángel de la Independencia', label: 'Mi momento', position: '50% 42%' },
  { src: '/images/fotosdexv/img6.JPG', alt: 'Regina extendiendo los brazos frente al Ángel de la Independencia', label: 'Cada paso, un sueño', position: '47% 44%' },
  { src: '/images/fotosdexv/img7.JPG', alt: 'Regina en arabesque sobre Paseo de la Reforma', label: 'Alas para crecer', position: '50% 44%' },
  { src: '/images/fotosdexv/img8.JPG', alt: 'Regina posando con el Ángel de la Independencia al fondo', label: 'La magia del camino', position: '58% 43%' },
  { src: '/images/fotosdexv/img9.JPG', alt: 'Retrato de Regina frente al Ángel de la Independencia', label: 'Así comienza mi historia', position: '58% 40%' },
];
export const videos = [
  // Puedes usar { type: 'youtube', youtubeId: 'ID', ... } en lugar de un archivo local.
  { type: 'local', src: '/videos/momento.mp4', poster: '/images/fotosdexv/img7.JPG', posterAlt: 'Regina bailando frente al Ángel de la Independencia', title: 'La magia está en los pequeños momentos', description: 'Un pequeño adelanto de la inspiración para esta noche.', caption: 'Un recuerdo especial antes de mis XV' },
];
export const menu = [
  { course: 'Para comenzar', title: 'Crema de flores de calabaza', description: 'Con un toque de queso de cabra y crujiente de parmesano', icon: 'starter' },
  { course: 'El plato principal', title: 'Pollo en salsa de almendras', description: 'Acompañado de puré rústico y vegetales de temporada', icon: 'main' },
  { course: 'Un final dulce', title: 'Delicia de frutos rojos', description: 'Mousse de vainilla, frutos del bosque y un toque de magia', icon: 'dessert' },
  { course: 'Para brindar', title: 'Un brindis por los sueños', description: 'Mocktails de frutos rojos, aguas frescas y refrescos', icon: 'drinks' },
];
export const events = [
  { name: 'La celebración', time: '20:00 h', place: 'Quinta Casa Del Árbol', address: 'Álvaro Obregón 48, Coyol Ivec, 91780 Veracruz, Ver.', mapsUrl: 'https://g.co/kgs/7nVhfAE', icon: 'party' },
];
export const navigation = [
  ['Inicio', 'inicio'], ['Galería', 'galeria'], ['Video', 'video'], ['Menú', 'menu'], ['Evento', 'evento'], ['Dress code', 'vestimenta'], ['RSVP', 'rsvp'],
];
