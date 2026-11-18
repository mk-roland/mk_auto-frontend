import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
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
  useReveal(scope);

  return (
    <div ref={scope} className="space-y-24 pb-24">

      {/* 1. HERO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <section data-reveal className="relative overflow-hidden rounded-3xl bg-slate-900 text-white px-6 py-12 sm:px-12 md:py-16">
          {/* Halo lumineux */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative grid gap-12 md:grid-cols-2 md:items-center">
            <div className="space-y-6 text-center md:text-left">
              <p className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-300 border border-blue-500/20 px-4 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
                <Sparkles size={14} /> Location premium à Abidjan
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Louez votre véhicule en toute <span className="text-blue-400">sérénité</span>
              </h1>

              <p className="text-slate-300 text-lg max-w-xl mx-auto md:mx-0 leading-relaxed">
                Citadines économiques, SUV familiaux ou berlines de confort : une flotte récente,
                entretenue et disponible immédiatement au meilleur prix.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <Link
                  to="/catalogue"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-500 transition-colors shadow-md"
                >
                  Voir nos véhicules <ArrowRight size={18} />
                </Link>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto text-center text-slate-200 border border-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 hover:text-white transition-colors"
                >
                  Réservation rapide
                </Link>
              </div>
            </div>

            {/* Visuel : "showroom" clair dans lequel l'image se fond, avec badge de prix en chevauchement */}
            <div className="relative">
              <div className="rounded-2xl bg-gradient-to-b from-slate-300 via-white to-white p-4 ring-1 ring-white/10">
                <img
                  src="/img_section_hero.jpg"
                  alt="Voiture de la flotte MK Auto"
                  className="w-full h-auto rounded-xl"
                />
              </div>
              <div className="absolute -bottom-6 left-6 rounded-xl bg-white dark:bg-slate-800 px-5 py-3 shadow-lg ring-1 ring-slate-900/5">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">À partir de</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  {prixMin.toLocaleString('fr-FR')} <span className="text-sm font-medium text-slate-500 dark:text-slate-400">FCFA / jour</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 2. ENGAGEMENTS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div data-reveal>
        <SectionHeader
          eyebrow="Nos engagements"
          title="Pourquoi choisir MK Auto ?"
          subtitle="Nous mettons tout en œuvre pour vous offrir une expérience de conduite fluide, transparente et sans mauvaise surprise."
        />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {temoignagesData.map((t) => (
            <Temoignage key={t.id} temoim={t} />
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;
