import { Link } from 'react-router-dom';
import { Users, Cog, Fuel, ArrowRight } from 'lucide-react';

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80";

export default function VehicleCard({
  id,
  nom,
  marque,
  categorie,
  energie,
  boite,
  prix,
  image,
  places,
}) {
  const specs = [
    { icon: Users, label: `${places} places` },
    { icon: Cog, label: boite },
    { icon: Fuel, label: energie },
  ];

  return (
    <Link
      to={`/vehicle/detail/${id}`}
      data-reveal
      className="group h-full flex flex-col bg-white dark:bg-nuit-900 border-2 border-nuit-200 dark:border-nuit-800 rounded-sm overflow-hidden
      hover:border-soleil-500 transition-colors duration-200
      focus-visible:outline-3 focus-visible:outline-soleil-500 focus-visible:outline-offset-2"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] w-full bg-nuit-100 dark:bg-nuit-800 overflow-hidden">
        <img
          src={image}
          alt={`${marque} ${nom}`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
        <span className="absolute top-0 left-0 bg-nuit-950/85 text-white font-display text-sm font-bold uppercase tracking-wide backdrop-blur-sm px-3 py-1">
          {categorie}
        </span>
      </div>

      {/* Contenu */}
      <div className="p-5 flex-1 flex flex-col gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-nuit-500 dark:text-nuit-400">
            {marque}
          </p>
          <h3 className="mt-1 font-sign text-3xl font-bold text-nuit-950 dark:text-white">
            {nom}
          </h3>

          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-nuit-600 dark:text-nuit-300">
            {specs.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-1.5">
                <Icon size={16} className="text-nuit-400" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Prix (plaque) et action */}
        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="plate text-xl">
            <span className="plate-band" aria-hidden="true">CI</span>
            <span className="plate-text tabular-nums">
              {typeof prix === 'number' ? prix.toLocaleString('fr-FR') : prix}
              <span className="text-sm text-nuit-500">F/jour</span>
            </span>
          </span>

          <span className="inline-flex items-center gap-1 font-display text-lg font-bold uppercase text-nuit-950 dark:text-white">
            Voir
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
