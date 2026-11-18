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
  index = 0
}) {
  // Délai pour l'animation en cascade
  const delay = (index % 3) * 120;

  const specs = [
    { icon: Users, label: `${places} places` },
    { icon: Cog, label: boite },
    { icon: Fuel, label: energie },
  ];

  return (
    <Link
      to={`/vehicle/detail/${id}`}
      className="group h-full flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800
      shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <img
          src={image}
          alt={`${marque} ${nom}`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
        <span className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/80 text-slate-800 dark:text-slate-100 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md">
          {categorie}
        </span>
      </div>

      {/* Contenu */}
      <div className="p-6 flex-1 flex flex-col gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {marque}
          </p>
          <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {nom}
          </h3>

          {/* Caractéristiques */}
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
            {specs.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-1">
                <Icon size={16} className="text-slate-400 dark:text-slate-500" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Prix et action */}
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-end justify-between">
          <p>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {typeof prix === 'number' ? prix.toLocaleString('fr-FR') : prix}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400"> FCFA / jour</span>
          </p>

          <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
            Détails
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
