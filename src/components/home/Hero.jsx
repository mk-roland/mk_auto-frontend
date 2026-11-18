// src/components/home/Hero.jsx
// Hero « Route & signalisation » avec motion design (GSAP) :
//   1. le sur-titre apparaît ;
//   2. LOUEZ. ROULEZ. RENDEZ. montent ligne par ligne derrière un masque,
//      puis les points orange "tombent" en place ;
//   3. texte et boutons arrivent ;
//   4. la photo s'ouvre en biais depuis la droite, la voiture recule en place ;
//   5. la plaque du véhicule glisse, les compteurs défilent (véhicules, catégories, prix) ;
//   puis les marquages de route défilent en continu et la photo se décale au scroll.
// Si l'utilisateur a demandé moins d'animations, tout s'affiche directement.
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { gsap, useGSAP, MOTION } from '../../lib/gsap.js';
import { VEHICULES_DATA, FILTER_OPTIONS } from '../../data/vehicleData';
import { whatsappUrl } from '../../config/contact';
import WhatsappIcon from '../social/meta.jsx';

// Chiffres réels, calculés depuis la flotte
const parPrix = [...VEHICULES_DATA].sort((a, b) => a.prix - b.prix);
const moinsCher = parPrix[0];
const plusCher = parPrix[parPrix.length - 1];
const nbCategories = FILTER_OPTIONS.categories.filter((c) => c !== 'Toutes').length;
// Véhicule mis en avant sur la photo
const vedette = VEHICULES_DATA.find((v) => v.id === 9);

const STATS = [
  { value: VEHICULES_DATA.length, label: 'véhicules' },
  { value: nbCategories, label: 'catégories' },
  { value: moinsCher.prix, label: 'FCFA / jour minimum', format: true },
];

const LIGNES = ['Louez', 'Roulez', 'Rendez'];

export default function Hero() {
  const scope = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION, () => {
      const q = (name) => scope.current.querySelectorAll(`[data-hero="${name}"]`);
      const photo = q('photo')[0];
      const formeFinale = getComputedStyle(photo).clipPath;

      const tl = gsap.timeline({ delay: 0.2, defaults: { ease: 'power3.out' } });
      tl.from(q('kicker'), { x: -20, autoAlpha: 0, duration: 0.5 }, 0)
        .from(q('line'), { yPercent: 110, duration: 0.9, stagger: 0.12, ease: 'power4.out' }, 0.1)
        .from(q('dot'), { y: -60, autoAlpha: 0, duration: 0.5, stagger: 0.1, ease: 'bounce.out' }, '-=0.35')
        .from(q('text'), { y: 20, autoAlpha: 0, duration: 0.6 }, '-=0.5')
        .from(q('cta'), { y: 20, autoAlpha: 0, duration: 0.5, stagger: 0.1 }, '-=0.4')
        .fromTo(photo,
          { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' },
          { clipPath: formeFinale, duration: 1.2, ease: 'power4.inOut', clearProps: 'clipPath' }, 0.3)
        .from(q('car'), { scale: 1.18, xPercent: 6, duration: 1.6, ease: 'power3.out' }, '<')
        .fromTo(q('plate'), { x: 40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.6, clearProps: 'transform' }, '-=0.6')
        .from(q('stat'), { y: 20, autoAlpha: 0, duration: 0.5, stagger: 0.1 }, '-=0.5');

      // Compteurs : 0 → valeur réelle
      q('count').forEach((el) => {
        const cible = Number(el.dataset.value);
        const format = el.dataset.format === 'true';
        const o = { n: 0 };
        tl.to(o, {
          n: cible, duration: 1.2, ease: 'power2.out',
          onUpdate: () => { el.textContent = format ? Math.round(o.n).toLocaleString('fr-FR') : Math.round(o.n); },
        }, '<');
      });

      // Marquages qui défilent en continu
      gsap.to(q('road'), { backgroundPositionX: '-76px', duration: 0.8, ease: 'none', repeat: -1 });

      // Parallaxe : la photo descend moins vite que la page
      gsap.to(q('car'), {
        yPercent: 10, ease: 'none',
        scrollTrigger: { trigger: scope.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    });

    return () => mm.revert();
  }, { scope });

  return (
    <section ref={scope} className="relative bg-nuit-950 text-white overflow-hidden">
      {/* Photo : pleine hauteur à droite sur grand écran, coupée en biais */}
      <div
        data-hero="photo"
        className="relative aspect-[16/10] lg:aspect-auto lg:absolute lg:inset-y-0 lg:right-0 lg:w-[54%] overflow-hidden
          [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)] lg:[clip-path:polygon(22%_0%,100%_0%,100%_100%,0%_100%)]"
      >
        <img
          data-hero="car"
          src={vedette.image}
          alt={`${vedette.nom} de la flotte MK Auto, sur la route`}
          className="absolute inset-0 w-full h-full object-cover object-[60%_center]"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-nuit-950/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-nuit-950/40" aria-hidden="true"></div>

        {/* Plaque du véhicule vedette, cliquable */}
        <Link
          data-hero="plate"
          to={`/vehicle/detail/${vedette.id}`}
          className="plate absolute right-4 bottom-6 sm:right-6 text-base sm:text-lg hover:bg-nuit-50 focus-visible:outline-3 focus-visible:outline-soleil-500"
        >
          <span className="plate-band" aria-hidden="true">CI</span>
          <span className="plate-text">
            {vedette.nom}
            <span className="text-nuit-400" aria-hidden="true">·</span>
            {vedette.prix.toLocaleString('fr-FR')} F/jour
          </span>
        </Link>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-8 lg:pt-20 lg:pb-10">
        <div className="lg:w-[52%] space-y-7">
          <p data-hero="kicker" className="kicker text-soleil-400">Location de voitures · Abidjan</p>

          <h1 className="font-sign font-extrabold text-[clamp(4.25rem,11vw,9rem)] leading-[0.86]">
            {LIGNES.map((mot) => (
              <span key={mot} className="block overflow-hidden pb-1">
                <span data-hero="line" className="block">
                  {mot}<span data-hero="dot" className="inline-block text-soleil-500">.</span>
                </span>
              </span>
            ))}
          </h1>

          <p data-hero="text" className="max-w-md text-lg leading-relaxed text-nuit-300">
            {VEHICULES_DATA.length} véhicules à la journée, de la {moinsCher.nom} au {plusCher.nom}.
            Assurance incluse, livraison possible à l'aéroport ou à domicile.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link data-hero="cta" to="/catalogue" className="btn-primary group">
              Voir la flotte <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a data-hero="cta" href={whatsappUrl('Bonjour MK Auto, je voudrais louer un véhicule.')} target="_blank" rel="noopener noreferrer"
              className="btn-outline text-white hover:bg-white hover:text-nuit-950">
              <WhatsappIcon className="w-5 h-5" /> Écrire sur WhatsApp
            </a>
          </div>
        </div>

        {/* Chiffres de la flotte */}
        <dl className="mt-12 lg:mt-16 lg:w-[46%] grid grid-cols-3 border-t border-nuit-800">
          {STATS.map((s) => (
            <div key={s.label} data-hero="stat" className="pt-4 pr-4 flex flex-col-reverse">
              <dt className="text-xs sm:text-sm text-nuit-400">{s.label}</dt>
              <dd className="font-display text-3xl sm:text-4xl font-bold tabular-nums text-white">
                <span data-hero="count" data-value={s.value} data-format={s.format ? 'true' : 'false'}>
                  {s.format ? s.value.toLocaleString('fr-FR') : s.value}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Marquage au sol */}
      <div data-hero="road" className="road-dashes relative h-[3px]" aria-hidden="true"></div>
    </section>
  );
}
