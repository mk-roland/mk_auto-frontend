import { Star } from 'lucide-react';

// Initiales pour l'avatar : "Kouassi Irène" -> "KI"
const initiales = (nom) =>
  nom.split(' ').filter(Boolean).slice(0, 2).map((m) => m[0].toUpperCase()).join('');

// Témoignage sur fond bleu nuit : guillemet orange, étoiles dessinées puis remplies.
function Temoignage({ temoim }) {
  const note = temoim.note ?? 5;

  return (
    <figure data-item className="bg-nuit-900 border border-nuit-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-8 h-full">
      <div className="space-y-4">
        <div className="flex gap-1" role="img" aria-label={`Note : ${note} sur 5`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={18}
              data-draw
              {...(i < note ? { 'data-fill': true } : {})}
              className={i < note ? 'fill-soleil-500 text-soleil-500' : 'text-nuit-600'}
            />
          ))}
        </div>
        <blockquote className="relative pl-7 text-xl leading-relaxed text-nuit-100">
          <span className="absolute left-0 -top-1 font-display text-6xl leading-none text-soleil-400" aria-hidden="true">“</span>
          {temoim.temoignage}
        </blockquote>
      </div>

      <figcaption className="flex items-center gap-3">
        <span data-icon-box className="w-11 h-11 shrink-0 rounded-full bg-soleil-500 text-white font-display text-lg font-bold grid place-items-center">
          {initiales(temoim.nom)}
        </span>
        <div>
          <p className="font-semibold text-white">{temoim.nom}</p>
          <p className="text-sm text-nuit-400">{temoim.job}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default Temoignage;
