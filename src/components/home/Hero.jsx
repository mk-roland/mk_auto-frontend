// src/components/home/Hero.jsx
// Hero de l'accueil avec motion design (GSAP) :
//   1. les halos lumineux s'allument ;
//   2. le badge tombe en place, l'étincelle tourne ;
//   3. le titre monte mot par mot derrière un masque (SplitText) ;
//   4. un trait jaune se dessine sous « sérénité » (DrawSVG) ;
//   5. texte et boutons arrivent ;
//   6. le cadre photo s'ouvre de gauche à droite et la voiture "entre" en glissant ;
//   7. le badge de prix rebondit et le compteur défile jusqu'au prix minimum ;
//   puis ambiance : la voiture flotte, les halos dérivent, les marquages de route défilent,
//   le visuel suit légèrement la souris (ordinateur) et se décale au scroll (parallaxe).
// Si l'utilisateur a demandé moins d'animations, tout s'affiche directement.
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { gsap, SplitText, useGSAP, MOTION } from '../../lib/gsap.js';

export default function Hero({ prixMin }) {
  const scope = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION, () => {
      const q = (name) => `[data-hero="${name}"]`;

      // Titre découpé en mots, chaque ligne sert de masque
      const split = SplitText.create(q('title'), { type: 'lines,words', mask: 'lines', linesClass: 'pb-1' });

      const tl = gsap.timeline({ delay: 0.25, defaults: { ease: 'power3.out' } });
      tl.from(q('halo'), { scale: 0.3, autoAlpha: 0, duration: 1.6, stagger: 0.2, ease: 'power2.out' }, 0)
        .from(q('badge'), { y: -24, autoAlpha: 0, duration: 0.6 }, 0.15)
        .from(q('sparkle'), { rotation: -180, scale: 0, duration: 0.8, ease: 'back.out(2)' }, '<0.1')
        .from(split.words, { yPercent: 115, duration: 0.9, stagger: 0.06, ease: 'power4.out' }, 0.35)
        .from(q('underline'), { drawSVG: '0%', duration: 0.8, ease: 'power2.inOut' }, '-=0.3')
        .from(q('text'), { y: 24, autoAlpha: 0, duration: 0.7 }, '-=0.6')
        .from(q('cta'), { y: 24, autoAlpha: 0, scale: 0.95, duration: 0.6, stagger: 0.12 }, '-=0.45')
        .fromTo(q('frame'), { clipPath: 'inset(0% 100% 0% 0% round 16px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 16px)', duration: 1.1, ease: 'power4.inOut' }, 0.5)
        .from(q('car'), { xPercent: -18, scale: 1.12, duration: 1.4, ease: 'power3.out' }, '<0.2')
        .from(q('road'), { autoAlpha: 0, duration: 0.6 }, '<0.4')
        .from(q('price'), { scale: 0.5, y: 20, autoAlpha: 0, duration: 0.7, ease: 'back.out(1.8)' }, '-=0.5');

      // Compteur du prix : 0 → prix minimum (format français)
      const prixEl = scope.current.querySelector(q('prix'));
      const compteur = { n: 0 };
      tl.to(compteur, {
        n: prixMin, duration: 1.2, ease: 'power2.out',
        onUpdate: () => { prixEl.textContent = Math.round(compteur.n).toLocaleString('fr-FR'); },
        onComplete: () => { prixEl.textContent = prixMin.toLocaleString('fr-FR'); },
      }, '<');

      // Ambiance (après l'entrée) : flottement, halos qui dérivent, marquages qui défilent
      tl.add(() => {
        gsap.to(q('float'), { y: -10, duration: 2.6, ease: 'sine.inOut', repeat: -1, yoyo: true });
        gsap.to(q('halo'), { x: 30, y: 20, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true, stagger: 1.5 });
      });
      gsap.to(q('road'), { backgroundPositionX: '-76px', duration: 0.9, ease: 'none', repeat: -1 });

      // Parallaxe au scroll : le visuel descend moins vite que la page
      gsap.to(q('visual'), {
        yPercent: 12, ease: 'none',
        scrollTrigger: { trigger: scope.current, start: 'top top', end: 'bottom top', scrub: true },
      });

      return () => split.revert();
    });

    // Le visuel suit légèrement la souris (ordinateur uniquement)
    mm.add(`${MOTION} and (hover: hover)`, () => {
      const el = scope.current.querySelector('[data-hero="tilt"]');
      const xTo = gsap.quickTo(el, 'rotationY', { duration: 0.8, ease: 'power3' });
      const yTo = gsap.quickTo(el, 'rotationX', { duration: 0.8, ease: 'power3' });
      gsap.set(el, { transformPerspective: 900 });
      const onMove = (e) => {
        const r = scope.current.getBoundingClientRect();
        xTo(((e.clientX - r.left) / r.width - 0.5) * 8);
        yTo(-((e.clientY - r.top) / r.height - 0.5) * 6);
      };
      const onLeave = () => { xTo(0); yTo(0); };
      scope.current.addEventListener('pointermove', onMove);
      scope.current.addEventListener('pointerleave', onLeave);
      return () => {
        scope.current?.removeEventListener('pointermove', onMove);
        scope.current?.removeEventListener('pointerleave', onLeave);
      };
    });

    return () => mm.revert();
  }, { scope, dependencies: [prixMin] });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
      <section ref={scope} className="relative overflow-hidden rounded-3xl bg-slate-900 text-white px-6 pt-12 pb-16 sm:px-12 md:pt-16 md:pb-20">
        {/* Halos lumineux */}
        <div data-hero="halo" className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/25 rounded-full blur-3xl pointer-events-none"></div>
        <div data-hero="halo" className="absolute -bottom-32 -left-24 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative grid gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-6 text-center md:text-left">
            <p data-hero="badge" className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-300 border border-blue-500/20 px-4 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
              <Sparkles data-hero="sparkle" size={14} /> Location premium à Abidjan
            </p>

            <h1 data-hero="title" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Louez votre véhicule en toute{' '}
              <span className="relative inline-block text-blue-400">
                sérénité
                {/* Trait "feutre" jaune dessiné sous le mot */}
                <svg className="absolute left-0 -bottom-2 w-full h-3 overflow-visible" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                  <path data-hero="underline" d="M3 9 C 50 2, 120 2, 197 7" fill="none" stroke="#f5c542" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p data-hero="text" className="text-slate-300 text-lg max-w-xl mx-auto md:mx-0 leading-relaxed">
              Citadines économiques, SUV familiaux ou berlines de confort : une flotte récente,
              entretenue et disponible immédiatement au meilleur prix.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <Link
                data-hero="cta"
                to="/catalogue"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-500 transition-colors shadow-md"
              >
                Voir nos véhicules <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                data-hero="cta"
                to="/contact"
                className="w-full sm:w-auto text-center text-slate-200 border border-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 hover:text-white transition-colors"
              >
                Réservation rapide
              </Link>
            </div>
          </div>

          {/* Visuel : cadre "showroom", voiture, badge de prix */}
          <div data-hero="visual" className="relative">
            <div data-hero="tilt" className="relative">
              <div data-hero="float">
                <div data-hero="frame" className="rounded-2xl bg-gradient-to-b from-slate-300 via-white to-white p-4 ring-1 ring-white/10 overflow-hidden">
                  <img
                    data-hero="car"
                    src="/img_section_hero.jpg"
                    alt="Voiture de la flotte MK Auto"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
              <div data-hero="price" className="absolute -bottom-6 left-6 rounded-xl bg-white dark:bg-slate-800 px-5 py-3 shadow-lg ring-1 ring-slate-900/5">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">À partir de</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">
                  <span data-hero="prix">{prixMin.toLocaleString('fr-FR')}</span>{' '}
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">FCFA / jour</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Marquages de route qui défilent en bas du hero */}
        <div
          data-hero="road"
          aria-hidden="true"
          className="absolute left-0 right-0 bottom-5 h-1 opacity-60 pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(90deg, #f5c542 0 42px, transparent 42px 76px)' }}
        ></div>
      </section>
    </div>
  );
}
