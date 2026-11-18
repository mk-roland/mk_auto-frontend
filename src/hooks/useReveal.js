// src/hooks/useReveal.js
// Remplace l'ancien useScrollReveal (IntersectionObserver + classes CSS).
// Tout élément portant l'attribut data-reveal apparaît au scroll, en cascade
// (ScrollTrigger.batch). Si l'utilisateur a demandé moins d'animations,
// rien n'est animé et le contenu est simplement visible.
import { gsap, ScrollTrigger, useGSAP, MOTION } from '../lib/gsap.js';

export function useReveal(scopeRef, dependencies = []) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const items = gsap.utils.toArray('[data-reveal]');
        // L'état de départ est posé par JS : sans JS, le contenu reste visible.
        gsap.set(items, { autoAlpha: 0, y: 40 });
        ScrollTrigger.batch(items, {
          start: 'top 90%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { autoAlpha: 1, y: 0, stagger: 0.12, overwrite: true }),
        });
      });
      return () => mm.revert();
    },
    { scope: scopeRef, dependencies, revertOnUpdate: true }
  );
}
