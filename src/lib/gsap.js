// src/lib/gsap.js
// Point d'entrée UNIQUE de GSAP dans le projet (même organisation que Zenith Bridge).
// Les plugins sont enregistrés une seule fois ici ; partout ailleurs on importe depuis ce fichier.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

// Réglages par défaut de toutes les animations.
gsap.defaults({ ease: 'power3.out', duration: 0.8 });

// Requêtes média pour gsap.matchMedia() :
// MOTION = l'utilisateur accepte les animations,
// REDUCE = il a demandé moins d'animations (réglage d'accessibilité du système).
export const MOTION = '(prefers-reduced-motion: no-preference)';
export const REDUCE = '(prefers-reduced-motion: reduce)';

export { gsap, ScrollTrigger, DrawSVGPlugin, useGSAP };
