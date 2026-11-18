import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Fuel, Users, Gauge, MapPin, Mail } from 'lucide-react';
import { whatsappUrl as creerLienWhatsApp } from '../config/contact.js';
import { VEHICULES_DATA } from '../data/vehicleData.js';
import WhatsappIcon from '../components/social/meta.jsx';

function VehiculeDetail() {
  const { id } = useParams();
  const vehicle = VEHICULES_DATA.find((v) => Number(v.id) === Number(id));

  if (!vehicle) {
    return (
      <div className="section-min-height flex flex-col items-center justify-center px-4 text-center">
        <h2 className="font-sign text-5xl font-extrabold text-nuit-950 dark:text-white">Véhicule introuvable</h2>
        <p className="text-nuit-600 mt-4 max-w-xl dark:text-nuit-300">
          Ce véhicule n'est plus disponible ou l'identifiant est incorrect. Consultez notre flotte disponible.
        </p>
        <Link
          to="/catalogue"
          className="mt-8 btn-primary"
        >
          <ArrowLeft size={18} />
          Retour au catalogue
        </Link>
      </div>
    );
  }

  // Génération du lien WhatsApp personnalisé avec les détails du véhicule
  const whatsappUrl = creerLienWhatsApp(
    `Bonjour ! Je souhaite réserver le véhicule "${vehicle.marque} ${vehicle.nom}" (Réf: #${vehicle.id}). Pouvez-vous me confirmer sa disponibilité et les modalités de réservation ?`
  );

  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="w-full max-w-6xl mx-auto">
        
        {/* En-tête : Navigation & Titre */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <span className="kicker text-nuit-600 dark:text-nuit-300">
              {vehicle.marque} — {vehicle.categorie}
            </span>
            <h1 className="font-sign text-5xl sm:text-6xl font-extrabold text-nuit-950 dark:text-white">
              {vehicle.nom}
            </h1>
          </div>
          
          <Link
            to="/catalogue"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-nuit-100 px-5 py-2.5 text-sm font-semibold text-nuit-700 transition hover:bg-nuit-200 dark:bg-nuit-800 dark:text-nuit-200 dark:hover:bg-nuit-700 self-start lg:self-auto"
          >
            <ArrowLeft size={16} />
            Retour au catalogue
          </Link>
        </div>

        {/* Grille Principale */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          
          {/* Visualisation : Image principale */}
          <div className="overflow-hidden rounded-2xl bg-nuit-100 dark:bg-nuit-800 border border-nuit-200 dark:border-nuit-800 relative group h-80 sm:h-96 lg:h-full min-h-80">
            <img
              src={vehicle.image}
              alt={vehicle.nom}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80";
              }}
            />
            <span className="absolute top-4 left-4 bg-nuit-950/80 text-white font-display text-sm font-bold uppercase tracking-wide backdrop-blur-sm px-3 py-1 rounded-full">
              {vehicle.categorie}
            </span>
          </div>

          {/* Informations & Inclusions */}
          <div className="flex flex-col justify-between space-y-6 rounded-2xl border border-nuit-200 bg-nuit-50 p-6 sm:p-8 dark:bg-nuit-800/50 dark:border-nuit-800">
            
            <div className="space-y-6">
              {/* Tarification */}
              <div className="flex items-baseline justify-between border-b border-nuit-200 dark:border-nuit-700 pb-4">
                <div>
                  <span className="font-display text-5xl font-bold tabular-nums text-nuit-950 dark:text-white">
                    {typeof vehicle.prix === 'number' ? vehicle.prix.toLocaleString('fr-FR') : vehicle.prix}
                  </span>
                  <span className="text-sm font-semibold text-nuit-500 dark:text-nuit-400"> FCFA / jour</span>
                </div>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  Disponible immédiatement
                </span>
              </div>

              {/* Badges Fiche Technique */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center p-3 rounded-xl bg-white dark:bg-nuit-900 border border-nuit-200 dark:border-nuit-800 text-center">
                  <Users className="text-nuit-950 dark:text-soleil-400 mb-1" size={20} />
                  <span className="text-xs text-nuit-500 dark:text-nuit-400">Capacité</span>
                  <span className="text-xs font-bold text-nuit-800 dark:text-white mt-0.5">{vehicle.places} Places</span>
                </div>

                <div className="flex flex-col items-center p-3 rounded-xl bg-white dark:bg-nuit-900 border border-nuit-200 dark:border-nuit-800 text-center">
                  <Gauge className="text-nuit-950 dark:text-soleil-400 mb-1" size={20} />
                  <span className="text-xs text-nuit-500 dark:text-nuit-400">Boîte</span>
                  <span className="text-xs font-bold text-nuit-800 dark:text-white mt-0.5">{vehicle.boite}</span>
                </div>

                <div className="flex flex-col items-center p-3 rounded-xl bg-white dark:bg-nuit-900 border border-nuit-200 dark:border-nuit-800 text-center">
                  <Fuel className="text-nuit-950 dark:text-soleil-400 mb-1" size={20} />
                  <span className="text-xs text-nuit-500 dark:text-nuit-400">Énergie</span>
                  <span className="text-xs font-bold text-nuit-800 dark:text-white mt-0.5">{vehicle.energie}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-nuit-900 dark:text-white uppercase tracking-wider">
                  Description
                </h3>
                <p className="text-sm text-nuit-600 dark:text-nuit-300 leading-relaxed">
                  {vehicle.description || `Profitez d'un confort de conduite exceptionnel avec cette ${vehicle.nom}. Idéale pour vos déplacements urbains ou longs trajets en toute sérénité.`}
                </p>
              </div>

              {/* Inclusions / Avantages de la réservation */}
              <div className="grid gap-3 sm:grid-cols-2 pt-2">
                <div className="rounded-xl border border-nuit-200 bg-white p-3 text-xs text-nuit-600 dark:bg-nuit-900 dark:border-nuit-800 dark:text-nuit-300 flex items-start gap-3">
                  <ShieldCheck className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-bold text-nuit-900 dark:text-white">Assurance Incluse</h4>
                    <p className="mt-0.5 text-nuit-500 dark:text-nuit-400">Couverture tous risques & assistance 24/7.</p>
                  </div>
                </div>

                <div className="rounded-xl border border-nuit-200 bg-white p-3 text-xs text-nuit-600 dark:bg-nuit-900 dark:border-nuit-800 dark:text-nuit-300 flex items-start gap-3">
                  <MapPin className="text-nuit-950 dark:text-soleil-400 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-bold text-nuit-900 dark:text-white">Livraison Flexible</h4>
                    <p className="mt-0.5 text-nuit-500 dark:text-nuit-400">Livraison possible à l'aéroport ou à domicile.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Boutons de réservation */}
            <div className="space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-emerald-600 px-6 py-4 text-base font-bold text-white transition duration-200 hover:bg-emerald-700 cursor-pointer"
            >
              <WhatsappIcon className="w-6 h-6 text-white" />
              Réserver via WhatsApp
            </a>

            {/* Alternative sans WhatsApp : formulaire avec ce véhicule déjà choisi */}
            <Link
              to={`/contact?vehicule=${vehicle.id}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-nuit-300 dark:border-nuit-700 px-6 py-3 text-sm font-semibold text-nuit-700 dark:text-nuit-200 transition hover:bg-white dark:hover:bg-nuit-800"
            >
              <Mail size={18} />
              Demander par formulaire
            </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default VehiculeDetail;