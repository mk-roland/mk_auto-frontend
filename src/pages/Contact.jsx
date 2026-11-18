import { useState } from 'react';
import { MapPin, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { sendViaFormspree } from '../services/contactService';
import { FORM_FIELDS, VEHICULES_OPTIONS, CONTACT_INFOS, HORAIRES } from '../data/reservationData';

export default function Contact() {
  useScrollReveal();

  const initialFormState = {
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    vehicule: '',
    dateDepart: '',
    dateRetour: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // null | 'success' | 'error' : message affiché sous le bouton
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      await sendViaFormspree(formData);
      setStatus('success');
      setFormData(initialFormState);
    } catch (error) {
      console.error("Erreur :", error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reveal-init space-y-12 py-12 max-w-7xl mx-auto px-4 sm:px-6">
      {/* En-tête de la page */}
      <SectionHeader
        as="h1"
        eyebrow="Contact & Réservation"
        title="Réservez votre véhicule"
        subtitle="Envoyez votre demande en quelques clics ou contactez directement notre agence."
      />

      {/* Grille : Formulaire à gauche (Colonne 1), Infos & Map à droite (Colonne 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* ─── COLONNE 1 : FORMULAIRE ─── */}
        <form 
          className="reveal-init space-y-4 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800" 
          onSubmit={handleSubmit}
        >
          {/* Lignes 1 & 2 : Nom, Prénom, Téléphone, Email via .map() */}
          {FORM_FIELDS.slice(0, 2).map((row) => (
            <div key={row.id} className={row.gridClass}>
              {row.inputs.map(({ name, label, type, placeholder }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-slate-700 mb-1 dark:text-slate-200">
                    {label}
                  </label>
                  <input 
                    type={type} 
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full border border-slate-300 dark:border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-800 dark:text-white"
                    required 
                  />
                </div>
              ))}
            </div>
          ))}

          {/* Ligne 3 : Choix du Véhicule (select dynamique par optgroup) */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 dark:text-slate-200">
              Véhicule souhaité
            </label>
            <select 
              name="vehicule"
              value={formData.vehicule}
              onChange={handleChange}
              className="w-full border border-slate-300 dark:border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-800 dark:text-white"
              required
            >
              <option value="">-- Choisir un véhicule (ou laissez-nous vous conseiller) --</option>
              {VEHICULES_OPTIONS.map((group, idx) => (
                <optgroup key={idx} label={group.category} className="dark:bg-slate-800 text-blue-800 dark:text-blue-400 font-semibold">
                  {group.items.map((car) => (
                    <option key={car.value} value={car.value} className="dark:bg-slate-900 dark:text-white font-normal">
                      {car.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Ligne 4 : Dates de Départ et Retour */}
          {FORM_FIELDS.slice(2).map((row) => (
            <div key={row.id} className={row.gridClass}>
              {row.inputs.map(({ name, label, type }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-slate-700 mb-1 dark:text-slate-200">
                    {label}
                  </label>
                  <input 
                    type={type} 
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full border border-slate-300 dark:border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-800 dark:text-white"
                    required 
                  />
                </div>
              ))}
            </div>
          ))}

          {/* Bouton de Soumission */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md mt-2 hover:cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande de disponibilité"}
          </button>

          {/* Retour après envoi, affiché dans la page plutôt qu'avec alert() */}
          {status === 'success' && (
            <p role="status" className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
              <CheckCircle2 size={20} className="shrink-0" />
              Votre demande a bien été envoyée. Nous vous recontactons rapidement pour confirmer la disponibilité.
            </p>
          )}
          {status === 'error' && (
            <p role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300">
              <AlertCircle size={20} className="shrink-0" />
              Impossible d'envoyer la demande pour le moment. Réessayez ou contactez-nous par téléphone ou WhatsApp.
            </p>
          )}
        </form>

        {/* ─── COLONNE 2 : INFOS & MAP ─── */}
        <div className="reveal-init space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl space-y-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-2 dark:text-white flex items-center gap-2">
                <MapPin size={20} className="text-blue-600 dark:text-blue-400" /> Agence MK Auto
              </h2>
              <div className="text-slate-600 space-y-1 dark:text-slate-300">
                <p>MK Auto</p>
                <p>Abidjan, Côte d'Ivoire</p>
              </div>
            </div>

            {/* Coordonnées mappées */}
            <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
              {CONTACT_INFOS.map(({ id, icon: Icon, prefix, label, href, target, hoverClass }) => (
                <a 
                  key={id}
                  href={href}
                  target={target}
                  rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                  className={`text-slate-600 dark:text-slate-300 transition flex items-center gap-2 ${hoverClass}`}
                >
                  <Icon size={18} className="shrink-0 text-slate-400" />
                  <span className="font-medium">{prefix}</span>
                  <span>{label}</span>
                </a>
              ))}
            </div>

            {/* Horaires mappés */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-800 mb-2 dark:text-white flex items-center gap-2">
                <Clock size={20} className="text-blue-600 dark:text-blue-400" /> Horaires d'ouverture
              </h2>
              <ul className="text-slate-600 space-y-1 dark:text-slate-300 text-sm">
                {HORAIRES.map(({ jours, heures }, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span className="font-semibold">{jours} :</span>
                    <span>{heures}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Carte Google Maps */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm h-64">
            <iframe
              title="Carte Agence MK Auto Abidjan"
              src="https://www.google.com/maps?q=Abidjan,+C%C3%B4te+d%27Ivoire&output=embed"              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
}