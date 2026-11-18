import { Link } from 'react-router-dom';
import { ShieldCheck, Car, Clock, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { temoignagesData } from '../data/temoignages'; 
import Temoignage from '../components/TemoignageCard';
import EngagementCard from '../components/EngagementCard';
import {engagementsData}  from '../data/engagementData';


function Home() {
  useScrollReveal();

  return (
    <div className="space-y-20 py-6 dark:text-white">
      
      {/* 1. SECTION HERO */}
      <section className="reveal-init flex flex-col md:flex-row items-center gap-10 bg-slate-900 text-white p-8 md:p-12 rounded-3xl shadow-xl overflow-hidden relative">
        
        {/* Effet d'arrière-plan lumineux */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex-1 space-y-6 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
            <Sparkles size={14} /> Service de Location Premium
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Louez votre véhicule en toute <span className="text-blue-500">sérénité</span> avec <span className="text-blue-400">MK Auto</span>
          </h1>
          
          <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
            Citadines économiques, SUV familiaux ou berlines de confort : découvrez notre flotte récente, entretenue et disponible immédiatement au meilleur prix.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <Link 
              to="/catalogue" 
              className="w-full sm:w-auto text-center bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-500/25 cursor-pointer transform hover:-translate-y-0.5"
            >
              Voir nos véhicules
            </Link>
            
            <Link 
              to="/contact" 
              className="w-full sm:w-auto text-center bg-slate-800 text-slate-200 border border-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-700 hover:text-white transition-all cursor-pointer"
            >
              Réservation rapide
            </Link>
          </div>
        </div>
        
        {/* Photo du véhicule Hero */}
        <div className="flex-1 w-full z-10">
          <img 
            src="/img_section_hero.jpg" 
            alt="MK Auto - Location de voiture" 
            className="w-full h-auto object-cover rounded-2xl shadow-2xl border border-slate-800 transform hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      </section>

      {/* 2. SECTION NOS ENGAGEMENTS / AVANTAGES (Remplace Notre Histoire) */}
      <section className="reveal-init max-w-6xl mx-auto px-4 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            Pourquoi choisir <span className="text-blue-600">MK Auto</span> ?
          </h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Nous mettons tout en œuvre pour vous offrir une expérience de conduite fluide, transparente et sans mauvaise surprise.
          </p>
        </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engagementsData.map((engagement,index) => (
              <EngagementCard key={engagement.id} {...engagement} />
            ))}
          </div>
        </section>

      {/* 3. SECTION TÉMOIGNAGES */}
      <section className="reveal-init space-y-10 px-4 max-w-6xl mx-auto">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Ce que disent nos conducteurs
          </h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
          <p className="max-w-xl mx-auto text-base text-slate-600 dark:text-slate-400">
            Découvrez l'expérience de nos clients qui nous font confiance pour leurs vacances, déplacements pro et trajets quotidiens.
          </p>
        </div>

        {/* Grille de témoignages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {temoignagesData.map((t, index) => (
            <Temoignage key={t.id} temoim={t} index={index} />
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;