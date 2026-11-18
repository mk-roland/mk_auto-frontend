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

      <ul data-sequence className="bg-white dark:bg-nuit-900 rounded-2xl border border-nuit-200 dark:border-nuit-800 overflow-hidden divide-y divide-nuit-200 dark:divide-nuit-800">
        {CATEGORIES.map(({ nom, nombre, prixMin, exemples, Icone }) => (
          <li key={nom} data-item>
            <Link
              to={`/catalogue?categorie=${encodeURIComponent(nom)}`}
              className="group grid grid-cols-[auto_minmax(0,1fr)_auto] sm:grid-cols-[auto_minmax(0,1.3fr)_minmax(0,1fr)_auto] items-center gap-4 sm:gap-8 py-5 sm:py-6
                hover:bg-nuit-50 dark:hover:bg-nuit-800/60 transition-colors px-4 sm:px-6 focus-visible:outline-3 focus-visible:-outline-offset-4 focus-visible:outline-soleil-500"
            >
              <span data-icon-box className="w-12 h-12 grid place-items-center bg-soleil-500/10 text-soleil-700 dark:text-soleil-400 rounded-xl">
                <Icone size={26} strokeWidth={2} data-draw />
              </span>

              <span className="min-w-0">
                <span className="block font-sign text-3xl sm:text-4xl font-bold text-nuit-950 dark:text-white">{nom}</span>
                <span className="block text-sm text-nuit-500 dark:text-nuit-400 truncate">
                  {nombre} véhicule{nombre > 1 ? 's' : ''} · {exemples.join(', ')}{nombre > 3 ? '…' : ''}
                </span>
              </span>

              <span className="hidden sm:block text-right">
                <span className="block text-xs uppercase tracking-wider text-nuit-500 dark:text-nuit-400">À partir de</span>
                <span className="font-display text-3xl font-bold tabular-nums text-nuit-950 dark:text-white">
                  {prixMin.toLocaleString('fr-FR')} <span className="text-lg">F</span>
                </span>
              </span>

              <ArrowRight size={28} className="text-nuit-400 group-hover:text-soleil-600 dark:group-hover:text-soleil-400 group-hover:translate-x-2 transition-transform" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
