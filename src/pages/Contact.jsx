import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import SectionHeader from '../components/SectionHeader';
import ReservationForm from '../components/contact/ReservationForm';
import AgenceInfos from '../components/contact/AgenceInfos';

// La page assemble ; les composants affichent ; les hooks contiennent la logique.
export default function Contact() {
  const scope = useRef(null);
  useReveal(scope);

  return (
    <div ref={scope} className="space-y-12 py-12 max-w-7xl mx-auto px-4 sm:px-6">
      <div data-reveal>
        <SectionHeader
          as="h1"
          eyebrow="Contact & Réservation"
          title="Réservez votre véhicule"
          subtitle="Envoyez votre demande en quelques clics ou contactez directement notre agence."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <ReservationForm />
        <AgenceInfos />
      </div>
    </div>
  );
}
