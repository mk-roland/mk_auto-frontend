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
      <div data-car className="w-20 h-20 rotate-45 bg-signal-500 border-[3px] border-asphalt-950 rounded-sm grid place-items-center" aria-hidden="true"><Car className="-rotate-45 text-asphalt-950" size={34} /></div>
      <h1 data-nf className="font-sign text-[9rem] font-extrabold text-asphalt-950 dark:text-white">404</h1>
      <p data-nf className="text-asphalt-600 dark:text-asphalt-400 max-w-md">
        Cette route ne mène nulle part : la page demandée n'existe pas ou a été déplacée.
      </p>
      <div data-nf className="flex flex-col sm:flex-row gap-3">
        <Link to="/" className="btn-signal">
          <ArrowLeft size={18} /> Retour à l'accueil
        </Link>
        <Link to="/catalogue" className="btn-outline text-asphalt-950 dark:text-white hover:bg-asphalt-950 hover:text-white dark:hover:bg-white dark:hover:text-asphalt-950">
          Voir les véhicules
        </Link>
      </div>
    </section>
  );
}
