# Regina · Mis XV

Invitación digital de una sola página, pensada para celular. React 19 + Vinext/Vite, Tailwind CSS 4, Framer Motion y Lucide, con confirmaciones persistentes en Cloudflare D1.

## Confirmaciones en producción

El formulario usa `POST /api/rsvp` y guarda las respuestas en D1 (`DB`, tabla `confirmations`). El servidor valida los campos y registra las fechas. El navegador conserva un recibo privado para actualizar la misma respuesta al editarla; no compartas ese recibo. Al borrar los datos del navegador se pierde la posibilidad de editar el registro anterior desde ese dispositivo.

El panel `/admin` permite consultar respuestas, contar personas y descargar CSV. La API `/api/confirmations` autoriza únicamente la cuenta del organizador `albertoafm96@gmail.com`, usando la identidad que proporciona Sites. El panel nunca muestra los tokens de edición. El Site conserva su acceso privado: compartirlo con invitados requiere configurar su audiencia por separado.

La configuración está en `.openai/hosting.json`. Las migraciones generadas con `npm run db:generate` viven en `drizzle/` y Sites las aplica al desplegar. No modificar migraciones aplicadas. Para probar D1 localmente, genera el build y aplica la migración siguiendo los comandos de `scripts/sites-env.mjs` y Wrangler. Con el preview en el puerto 4173, `node tests/integration.mjs` comprueba crear, editar, persistir y controlar el acceso; los registros de prueba quedan solo en la base local.

## Desarrollo

Usa Node.js 20.19+ o 22+ y npm. En el entorno preparado se verificó Node.js 24.

```bash
cd /workspace/XV-a-os
npm ci
npm run dev -- --port 5173
```

En otra máquina usa la ruta donde hayas descargado el proyecto. La página se sirve en el puerto 5173. Para generar los archivos de producción:

```bash
npm run build
npm run preview -- --port 4173
```

Publica la carpeta `dist` en un servicio de hosting estático. Compartir por WhatsApp requiere una URL pública HTTPS; el servidor de desarrollo local no es un enlace público.

## Personalizar la invitación

El contenido está en `src/data.js`:

- `EVENT_DATE`: fecha y hora con zona horaria explícita. Actualmente 19 de diciembre de 2026 a las 18:00 en Ciudad de México (`-06:00`). El año, día, mes, día de la semana y cuenta regresiva se derivan de esta constante.
- `invitation`: nombre, ciudad, texto de bienvenida, despedida, fecha límite del RSVP y dress code.
- `copy`: textos principales de portada, galería y cierre.
- `photos`: rutas, descripciones accesibles, títulos y posición de encuadre. Admite cualquier número de fotos en el lightbox; para cambiar el número de tarjetas visibles ajusta el grid en `src/styles.css`.
- `videos`: video local (`type: 'local', src: '/videos/archivo.mp4'`) o YouTube (`type: 'youtube', youtubeId: 'ID'`), portada y título. Los videos se abren con controles en un modal; el video local admite reproducción inline en móvil.
- `menu` y `events`: platillos, horarios, direcciones y enlaces de Maps. La recepción es un ejemplo sin ubicación real; no se inventa un enlace para ella.

Coloca tus archivos en `public/images` y `public/videos`. Las rutas comienzan con `/images/` o `/videos/`. Los títulos generales y etiquetas de los componentes se editan en `src/components` y la paleta, tipografía y distribución en `src/styles.css`.

La portada es una imagen **generada e ilustrativa**, no una foto de la quinceañera. La galería reutiliza distintos encuadres de esa imagen y una ilustración floral como placeholders. El video local de flores es una muestra CC0 de MDN ([fuente](https://github.com/mdn/interactive-examples/blob/main/live-examples/media/cc0-videos/flower.mp4)). El video adjunto por el usuario se utilizó como referencia de diseño y no se publicó como contenido del evento.

Las fuentes se empaquetan desde Fontsource y se sirven localmente. No se solicitan fuentes ni fotos a terceros al abrir la invitación. El embed de YouTube, si se activa, sí necesitará acceso a sus servicios.

Actualiza también el título, la descripción y las etiquetas Open Graph en `index.html` antes de publicar. Cuando tengas una URL pública, agrega `og:url` y `og:image` con URLs HTTPS absolutas para la tarjeta de WhatsApp. WhatsApp puede conservar versiones anteriores de esa tarjeta en su caché.

## RSVP: demostración y conexión real

Con `invitation.rsvpEndpoint: ''`, el formulario valida el nombre, la asistencia y un límite de 0–5 acompañantes. Guarda **solo la última respuesta** en `localStorage` bajo `regina-xv-rsvp`. Muestra expresamente que es una prueba y que **no envía la respuesta al organizador**. Se puede editar. Si se declina, se guardan cero acompañantes.

Para recibir confirmaciones, configura una URL HTTPS en `rsvpEndpoint`. `submitRSVP` en `src/utils.js` enviará un `POST` con JSON:

```json
{
  "name": "María López",
  "attendance": "yes",
  "guests": 2,
  "dietary": "Sin nueces",
  "message": "¡Felicidades!",
  "submittedAt": "2026-10-12T12:00:00.000Z"
}
```

`guests` cuenta acompañantes, sin incluir a quien responde. El servicio debe permitir el origen de la web mediante CORS, validar los datos en el servidor, persistirlos y responder con un estado HTTP 2xx al confirmar el registro. Los estados no exitosos y errores de red muestran un mensaje y permiten reintentar. No coloques claves privadas en el frontend.

## Experiencia y accesibilidad

- Galería fullscreen con botones, flechas del teclado, Escape, swipe horizontal y zoom.
- Modales con `dialog` nativo para mantener el foco; al cerrar se restaura el foco y el desplazamiento.
- Navegación sticky, menú móvil, progreso de lectura y anclas con scroll suave.
- Cuenta regresiva en tiempo real, que no muestra números negativos al pasar la fecha.
- Descarga de calendario `.ics` con conversión correcta a UTC.
- Animaciones al entrar en pantalla y microinteracciones; soporte de `prefers-reduced-motion`.
- Etiquetas de formulario, errores asociados a campos, texto alternativo y enlace para saltar al contenido.

## Validación

```bash
npm test
npm run test:e2e
npm run build
```

Las pruebas de Node comprueban el contador, límites del RSVP, guardado demo y contrato de envío/error. Playwright comprueba escritorio y móvil: secciones, recursos, desbordamiento, galería, gestos, foco, validación, edición, video, calendario y menú móvil.

Playwright usa Chromium del sistema si existe `/usr/bin/chromium`; también puedes establecer `PLAYWRIGHT_CHROMIUM_EXECUTABLE`. Si no tienes Chromium instalado:

```bash
npx playwright install chromium
```

## Estructura

```text
src/
  App.jsx                 composición de la invitación
  data.js                 contenido editable y fecha del evento
  utils.js                cuenta regresiva y servicio de RSVP
  styles.css              diseño responsive y animaciones
  components/
    Hero.jsx, Countdown.jsx, Gallery.jsx, VideoSection.jsx
    MenuSection.jsx, EventInfo.jsx, DressCode.jsx
    RSVPForm.jsx, ClosingSection.jsx, Header.jsx, Shared.jsx
public/
  images/                 imágenes de ejemplo locales
  videos/                 video de ejemplo local
tests/
  utils.test.js           pruebas de lógica y contrato de RSVP
  browser/                pruebas funcionales en navegador
```
