import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Fuel, Users, Gauge, CalendarCheck, MapPin } from 'lucide-react';
import { VEHICULES_DATA } from '../data/vehicleData.js';
import WhatsappIcon from '../components/social/meta.jsx';

function VehiculeDetail() {
  const { id } = useParams();
  const vehicle = VEHICULES_DATA.find((v) => Number(v.id) === Number(id));

  // Numéro WhatsApp de l'agence (Format international sans + ni espaces)
  const whatsappNumber = "2250000000000";

  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-slate-50 dark:bg-black">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Véhicule introuvable</h2>
        <p className="text-slate-600 mt-4 max-w-xl dark:text-gray-300">
          Ce véhicule n'est plus disponible ou l'identifiant est incorrect. Consultez notre flotte disponible.
        </p>
        <Link
          to="/catalogue"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold transition hover:bg-blue-700 shadow-md"
        >
          <ArrowLeft size={18} />
          Retour au catalogue
        </Link>
      </div>
    );
  }

  // Génération du lien WhatsApp personnalisé avec les détails du véhicule
  const messageWhatsApp = encodeURIComponent(
    `Bonjour ! Je souhaite réserver le véhicule "${vehicle.marque} ${vehicle.nom}" (Réf: #${vehicle.id}). Pouvez-vous me confirmer sa disponibilité et les modalités de réservation ?`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${messageWhatsApp}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-8 sm:py-12 dark:bg-black">
      <div className="w-full max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl md:p-8 dark:bg-slate-900 dark:border-slate-800">
        
        {/* En-tête : Navigation & Titre */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              {vehicle.marque} — {vehicle.categorie}
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
              {vehicle.nom}
            </h1>
          </div>
          
          <Link
            to="/catalogue"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 self-start lg:self-auto"
          >
            <ArrowLeft size={16} />
            Retour au catalogue
          </Link>
        </div>

        {/* Grille Principale */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          
          {/* Visualisation : Image principale */}
          <div className="overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 relative group h-80 sm:h-96 lg:h-full min-h-80">
            <img
              src={vehicle.image}
              alt={vehicle.nom}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80";
              }}
            />
            <span className="absolute top-4 left-4 bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md">
              {vehicle.categorie}
            </span>
          </div>

          {/* Informations & Inclusions */}
          <div className="flex flex-col justify-between space-y-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 dark:bg-slate-800/50 dark:border-slate-800">
            
            <div className="space-y-6">
              {/* Tarification */}
              <div className="flex items-baseline justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
                <div>
                  <span className="text-3xl font-black text-slate-900 dark:text-white">
                    {typeof vehicle.prix === 'number' ? vehicle.prix.toLocaleString('fr-FR') : vehicle.prix}
                  </span>
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400"> FCFA / jour</span>
                </div>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  Disponible immédiatement
                </span>
              </div>

              {/* Badges Fiche Technique */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                  <Users className="text-blue-500 mb-1" size={20} />
                  <span className="text-xs text-slate-500 dark:text-slate-400">Capacité</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-white mt-0.5">{vehicle.places} Places</span>
                </div>

                <div className="flex flex-col items-center p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                  <Gauge className="text-blue-500 mb-1" size={20} />
                  <span className="text-xs text-slate-500 dark:text-slate-400">Boîte</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-white mt-0.5">{vehicle.boite}</span>
                </div>

                <div className="flex flex-col items-center p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                  <Fuel className="text-blue-500 mb-1" size={20} />
                  <span className="text-xs text-slate-500 dark:text-slate-400">Énergie</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-white mt-0.5">{vehicle.energie}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Description
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {vehicle.description || `Profitez d'un confort de conduite exceptionnel avec cette ${vehicle.marque} ${vehicle.nom}. Idéale pour vos déplacements urbains ou longs trajets en toute sérénité.`}
                </p>
              </div>

              {/* Inclusions / Avantages de la réservation */}
              <div className="grid gap-3 sm:grid-cols-2 pt-2">
                <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 flex items-start gap-3">
                  <ShieldCheck className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Assurance Incluse</h4>
                    <p className="mt-0.5 text-slate-500 dark:text-slate-400">Couverture tous risques & assistance 24/7.</p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 flex items-start gap-3">
                  <MapPin className="text-blue-500 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Livraison Flexible</h4>
                    <p className="mt-0.5 text-slate-500 dark:text-slate-400">Livraison possible à l'aéroport ou à domicile.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bouton de réservation WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-600 px-6 py-4 text-base font-bold text-white transition duration-200 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 cursor-pointer"
            >
              <WhatsappIcon className="w-6 h-6 text-white" />
              Réserver via WhatsApp
            </a>

          </div>
        </div>
      </div>
    </div>
  );
}

export default VehiculeDetail;