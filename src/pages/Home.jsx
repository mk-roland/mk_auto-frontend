import { useRef } from 'react';
import { Phone } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { useSequence } from '../hooks/useSequence';
import { temoignagesData } from '../data/temoignages';
import { engagementsData } from '../data/engagementData';
import { CONTACT, whatsappUrl } from '../config/contact';
import Hero from '../components/home/Hero';
import Flotte from '../components/home/Flotte';
import Temoignage from '../components/TemoignageCard';
import EngagementCard from '../components/EngagementCard';
import SectionHeader from '../components/SectionHeader';
import WhatsappIcon from '../components/social/meta.jsx';

function Home() {
  const scope = useRef(null);
  useReveal(scope);    // en-têtes de section
  useSequence(scope);  // lignes et cartes une par une + icônes dessinées

  return (
    <div ref={scope}>

      {/* 1. HERO (motion design : components/home/Hero.jsx) */}
      <Hero />

      {/* 2. LA FLOTTE : tarifs par catégorie */}
      <div className="py-20 sm:py-28">
        <Flotte />
      </div>

      {/* 3. ENGAGEMENTS : panneaux en losange */}
      <section className="bg-white dark:bg-asphalt-900 border-y border-asphalt-200 dark:border-asphalt-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 space-y-14">
          <div data-reveal>
            <SectionHeader
              eyebrow="Nos engagements"
              title="Les règles de la maison"
              subtitle="Ce que vous pouvez attendre de nous, à chaque location."
            />
          </div>
          <div data-sequence className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-0">
            {engagementsData.map((engagement) => (
              <EngagementCard key={engagement.id} {...engagement} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. TÉMOIGNAGES : bande asphalte */}
      <section className="bg-asphalt-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 space-y-14">
          <div data-reveal>
            <SectionHeader
              light
              eyebrow="Témoignages"
              title="Ils ont roulé avec nous"
              subtitle="Vacances, déplacements professionnels ou trajets quotidiens."
            />
          </div>
          <div data-sequence className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {temoignagesData.map((t) => (
              <Temoignage key={t.id} temoim={t} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. APPEL À L'ACTION : bande jaune signalisation */}
      <section className="bg-signal-500 text-asphalt-950">
        <div data-reveal className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="space-y-3">
            <h2 className="font-sign text-5xl sm:text-6xl font-extrabold text-balance">Besoin d'une voiture demain matin ?</h2>
            <p className="text-lg max-w-xl">
              Écrivez-nous sur WhatsApp ou appelez l'agence : on vous confirme la disponibilité et on prépare le véhicule.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={whatsappUrl('Bonjour MK Auto, je voudrais louer un véhicule.')} target="_blank" rel="noopener noreferrer"
              className="btn-outline bg-asphalt-950 border-asphalt-950 text-white hover:bg-asphalt-800">
              <WhatsappIcon className="w-5 h-5" /> WhatsApp
            </a>
            <a href={`tel:${CONTACT.telephoneLien}`} className="btn-outline text-asphalt-950 hover:bg-asphalt-950 hover:text-signal-500">
              <Phone size={20} /> {CONTACT.telephone}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
