import { useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { gsap, ScrollTrigger, useGSAP, MOTION } from '../lib/gsap.js';

export default function Layout() {
  const mainRef = useRef(null);
  const { pathname } = useLocation();

  // À chaque changement de page : on remonte en haut, puis le contenu entre
  // en fondu + léger glissement. Les filtres du catalogue (?categorie=...)
  // ne changent pas le pathname, donc ils ne relancent pas la transition.
  useGSAP(() => {
    window.scrollTo(0, 0);
    const mm = gsap.matchMedia();
    mm.add(MOTION, () => {
      gsap.fromTo(mainRef.current,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.5, clearProps: 'transform',
          onComplete: () => ScrollTrigger.refresh() });
    });
    return () => mm.revert();
  }, { dependencies: [pathname] });

  return (
    <div className="min-h-screen flex flex-col justify-between bg-nuit-50 text-nuit-950 dark:bg-nuit-950 dark:text-nuit-100 font-sans">
      <Navbar />

      <main ref={mainRef} className="flex-1 w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
