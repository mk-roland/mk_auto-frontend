// src/hooks/useSequence.js
// Apparition "un par un" d'une rangée de cartes, avec dessin des icônes.
//
// Utilisation dans le JSX :
//   <div data-sequence>              ← le groupe (déclenche quand il entre à l'écran)
//     <div data-item>                ← chaque carte, révélée l'une après l'autre
//       <Icon data-draw />           ← icône SVG dessinée trait par trait (DrawSVG)
//       <Star data-draw data-fill /> ← dessinée, puis remplie
//
// Ordre : carte 1 apparaît → son icône se dessine → carte 2 apparaît → …
// Si l'utilisateur a demandé moins d'animations, tout est simplement visible.
import { gsap, useGSAP, MOTION } from '../lib/gsap.js';

const SHAPES = 'path, circle, rect, line, polyline, polygon, ellipse';

export function useSequence(scopeRef) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.utils.toArray('[data-sequence]').forEach((group) => {
          const items = gsap.utils.toArray(group.querySelectorAll('[data-item]'));
          if (!items.length) return;

          // État de départ posé par JS : sans JS, le contenu reste visible.
          gsap.set(items, { autoAlpha: 0, y: 48, scale: 0.97 });

          const tl = gsap.timeline({
            scrollTrigger: { trigger: group, start: 'top 80%', once: true },
          });

          items.forEach((item, i) => {
            const icons = item.querySelectorAll('[data-draw]');
            const shapes = item.querySelectorAll(`[data-draw] :is(${SHAPES})`);
            const fills = item.querySelectorAll('[data-fill]');
            const iconBoxes = item.querySelectorAll('[data-icon-box]');

            if (shapes.length) gsap.set(shapes, { drawSVG: '0%' });
            if (fills.length) gsap.set(fills, { fillOpacity: 0 });
            if (iconBoxes.length) gsap.set(iconBoxes, { scale: 0.6, rotation: -12 });

            // La carte arrive (chevauche la fin du dessin de la précédente)
            tl.to(item, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6 }, i === 0 ? 0 : '-=0.35');

            // Le support de l'icône "rebondit" en place
            if (iconBoxes.length) {
              tl.to(iconBoxes, { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(2)' }, '<0.15');
            }

            // L'icône se dessine trait par trait, icône par icône (étoiles en cascade)
            if (shapes.length) {
              icons.forEach((icon, k) => {
                tl.to(icon.querySelectorAll(SHAPES), {
                  drawSVG: '100%', duration: 0.7, ease: 'power2.inOut', stagger: 0.12,
                }, k === 0 ? '<0.1' : '<0.12');
              });
            }

            // Puis le remplissage (étoiles)
            if (fills.length) {
              tl.to(fills, { fillOpacity: 1, duration: 0.3, stagger: 0.08 }, '-=0.35');
            }
          });
        });
      });
      return () => mm.revert();
    },
    { scope: scopeRef }
  );
}
