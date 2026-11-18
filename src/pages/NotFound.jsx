import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Car } from 'lucide-react';
import { gsap, useGSAP, MOTION } from '../lib/gsap.js';

export default function NotFound() {
  const scope = useRef(null);

  useGSAP(() => {
    gsap.matchMedia().add(MOTION, () => {
      // La voiture "cherche sa route" : elle avance et recule en boucle.
      gsap.to('[data-car]', { x: 24, duration: 1.4, ease: 'sine.inOut', repeat: -1, yoyo: true });
      gsap.from('[data-nf]', { autoAlpha: 0, y: 30, stagger: 0.12 });
    });
  }, { scope });

  return (
    <section ref={scope} className="section-min-height flex flex-col items-center justify-center gap-6 px-4 text-center">
      <Car data-car className="text-blue-600 dark:text-blue-400" size={64} aria-hidden="true" />
      <h1 data-nf className="text-6xl font-extrabold text-slate-900 dark:text-white">404</h1>
      <p data-nf className="text-slate-600 dark:text-slate-400 max-w-md">
        Cette route ne mène nulle part : la page demandée n'existe pas ou a été déplacée.
      </p>
      <div data-nf className="flex flex-col sm:flex-row gap-3">
        <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition-colors">
          <ArrowLeft size={18} /> Retour à l'accueil
        </Link>
        <Link to="/catalogue" className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-slate-700 px-6 py-3 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          Voir les véhicules
        </Link>
      </div>
    </section>
  );
}
