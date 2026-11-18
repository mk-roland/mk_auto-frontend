import { Star } from 'lucide-react';

// Initiales pour l'avatar : "Kouassi Irène" -> "KI"
const initiales = (nom) =>
  nom.split(' ').filter(Boolean).slice(0, 2).map((m) => m[0].toUpperCase()).join('');

function Temoignage({ temoim, index }) {
  const note = temoim.note ?? 5;

  return (
    <figure
      className="reveal-item bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-6 h-full"
      style={{ transitionDelay: `${(index % 3) * 120}ms` }}
    >
      <div className="space-y-4">
        <div className="flex gap-1" aria-label={`Note : ${note} sur 5`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={16}
              className={i < note ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'}
            />
          ))}
        </div>
        <blockquote className="text-slate-700 dark:text-slate-300 leading-relaxed">
          « {temoim.temoignage} »
        </blockquote>
      </div>

      <figcaption className="flex items-center gap-3">
        <span className="w-10 h-10 shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-semibold flex items-center justify-center">
          {initiales(temoim.nom)}
        </span>
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">{temoim.nom}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{temoim.job}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default Temoignage;
