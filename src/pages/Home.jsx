import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useSequence } from '../hooks/useSequence';
import Hero from '../components/home/Hero';
import { temoignagesData } from '../data/temoignages';
import { engagementsData } from '../data/engagementData';
import { VEHICULES_DATA } from '../data/vehicleData';
import Temoignage from '../components/TemoignageCard';
import EngagementCard from '../components/EngagementCard';
import SectionHeader from '../components/SectionHeader';

// Prix le plus bas de la flotte, pour l'accroche du hero
const prixMin = Math.min(...VEHICULES_DATA.map((v) => v.prix).filter((p) => typeof p === 'number'));

function Home() {
  const scope = useRef(null);
  useReveal(scope);    // en-têtes de section
  useSequence(scope);  // cartes une par une + icônes dessinées

  return (
    <div ref={scope} className="space-y-24 pb-24">

      {/* 1. HERO (motion design : components/home/Hero.jsx) */}
      <Hero prixMin={prixMin} />

      {/* 2. ENGAGEMENTS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div data-reveal>
        <SectionHeader
          eyebrow="Nos engagements"
          title="Pourquoi choisir MK Auto ?"
          subtitle="Nous mettons tout en œuvre pour vous offrir une expérience de conduite fluide, transparente et sans mauvaise surprise."
        />
        </div>
        <div data-sequence className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {engagementsData.map((engagement) => (
            <EngagementCard key={engagement.id} {...engagement} />
          ))}
        </div>
      </section>

      {/* 3. TÉMOIGNAGES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div data-reveal>
        <SectionHeader
          eyebrow="Témoignages"
          title="Ce que disent nos conducteurs"
          subtitle="Vacances, déplacements professionnels ou trajets quotidiens : ils nous font confiance."
        />
        </div>
        <div data-sequence className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {temoignagesData.map((t) => (
            <Temoignage key={t.id} temoim={t} />
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;
