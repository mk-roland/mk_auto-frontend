// Coche de succès dessinée avec DrawSVG, rejouée à chaque envoi réussi (prop "play").
// Reprise de Zenith Bridge.
import { useRef } from 'react';
import { gsap, useGSAP, MOTION } from '../../lib/gsap.js';

export default function SuccessCheck({ play }) {
  const scope = useRef(null);

  useGSAP(() => {
    if (!play) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION, () => {
      gsap.timeline()
        .fromTo('circle', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6, ease: 'power2.inOut' })
        .fromTo('path', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.4 }, '-=0.1');
    });
    return () => mm.revert();
  }, { scope, dependencies: [play] });

  return (
    <svg ref={scope} viewBox="0 0 52 52" className="h-6 w-6 shrink-0" aria-hidden="true">
      <circle cx="26" cy="26" r="24" fill="none" className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="3" />
      <path d="M14 27l8 8 16-16" fill="none" className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
