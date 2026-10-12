import Header from './components/Header';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import Gallery from './components/Gallery';
import VideoSection from './components/VideoSection';
import MenuSection from './components/MenuSection';
import EventInfo from './components/EventInfo';
import DressCode from './components/DressCode';
import RSVPForm from './components/RSVPForm';
import ClosingSection from './components/ClosingSection';
export default function App() {
  return <><a href="#contenido" className="skip-link">Saltar al contenido</a><Header /><main id="contenido"><Hero /><Countdown /><Gallery /><VideoSection /><MenuSection /><EventInfo /><DressCode /><RSVPForm /><ClosingSection /></main></>;
}
