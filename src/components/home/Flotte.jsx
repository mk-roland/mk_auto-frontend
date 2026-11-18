// Tableau des tarifs par catégorie, calculé depuis la flotte réelle.
// Chaque ligne mène au catalogue filtré. Les lignes apparaissent une par une
// et leurs icônes se dessinent (hooks/useSequence.js).
import { Link } from 'react-router-dom';
import { Car, CarFront, Mountain, Gem, Bus, ArrowRight } from 'lucide-react';
import { VEHICULES_DATA, FILTER_OPTIONS } from '../../data/vehicleData';
import SectionHeader from '../SectionHeader';

const ICONES = {
  'Citadines & Économiques': Car,
  'Berlines & Confort': CarFront,
  'SUV & 4x4': Mountain,
  'Luxe & Prestige': Gem,
  'Utilitaires & Minibus': Bus,
};

const CATEGORIES = FILTER_OPTIONS.categories
  .filter((c) => c !== 'Toutes')
  .map((nom) => {
    const vehicules = VEHICULES_DATA.filter((v) => v.categorie === nom).sort((a, b) => a.prix - b.prix);
    return {
      nom,
      nombre: vehicules.length,
      prixMin: vehicules[0]?.prix ?? 0,
      exemples: vehicules.slice(0, 3).map((v) => v.nom),
      Icone: ICONES[nom] ?? Car,
    };
  })
  .filter((c) => c.nombre > 0);

export default function Flotte() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
      <div data-reveal>
        <SectionHeader
          eyebrow="Tarifs à la journée"
          title="La flotte"
          subtitle="Choisissez une catégorie pour voir les véhicules disponibles. Les prix sont par jour, assurance comprise."
        />
      </div>

      <ul data-sequence className="border-b-2 border-asphalt-950 dark:border-asphalt-700">
        {CATEGORIES.map(({ nom, nombre, prixMin, exemples, Icone }) => (
          <li key={nom} data-item className="border-t-2 border-asphalt-950 dark:border-asphalt-700">
            <Link
              to={`/catalogue?categorie=${encodeURIComponent(nom)}`}
              className="group grid grid-cols-[auto_minmax(0,1fr)_auto] sm:grid-cols-[auto_minmax(0,1.3fr)_minmax(0,1fr)_auto] items-center gap-4 sm:gap-8 py-5 sm:py-6
                hover:bg-white dark:hover:bg-asphalt-900 transition-colors px-2 sm:px-4 focus-visible:outline-3 focus-visible:outline-signal-500"
            >
              <span data-icon-box className="w-12 h-12 grid place-items-center bg-signal-500 text-asphalt-950 rounded-sm">
                <Icone size={26} strokeWidth={2} data-draw />
              </span>

              <span className="min-w-0">
                <span className="block font-sign text-3xl sm:text-4xl font-bold text-asphalt-950 dark:text-white">{nom}</span>
                <span className="block text-sm text-asphalt-500 dark:text-asphalt-400 truncate">
                  {nombre} véhicule{nombre > 1 ? 's' : ''} · {exemples.join(', ')}{nombre > 3 ? '…' : ''}
                </span>
              </span>

              <span className="hidden sm:block text-right">
                <span className="block text-xs uppercase tracking-wider text-asphalt-500 dark:text-asphalt-400">À partir de</span>
                <span className="font-display text-3xl font-bold tabular-nums text-asphalt-950 dark:text-white">
                  {prixMin.toLocaleString('fr-FR')} <span className="text-lg">F</span>
                </span>
              </span>

              <ArrowRight size={28} className="text-asphalt-950 dark:text-white group-hover:translate-x-2 transition-transform" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
