import { useState } from 'react';
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

    try {
      await sendViaFormspree(formData);
      alert("Votre demande de réservation a été envoyée avec succès !");
      setFormData(initialFormState);
    } catch (error) {
      console.error("Erreur :", error);
      alert("Impossible d'envoyer la demande pour le moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reveal-init space-y-12 py-6 max-w-7xl mx-auto px-4 dark:bg-black dark:text-white">
      {/* En-tête de la page */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-blue-800 dark:text-blue-500">Contact & Réservation</h1>
        <p className="text-slate-500 dark:text-gray-300">
          Réservez votre véhicule en quelques clics ou contactez directement notre agence.
        </p>
      </div>

      {/* Grille : Formulaire à gauche (Colonne 1), Infos & Map à droite (Colonne 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* ─── COLONNE 1 : FORMULAIRE ─── */}
        <form 
          className="reveal-init space-y-4 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-800" 
          onSubmit={handleSubmit}
        >
          {/* Lignes 1 & 2 : Nom, Prénom, Téléphone, Email via .map() */}
          {FORM_FIELDS.slice(0, 2).map((row) => (
            <div key={row.id} className={row.gridClass}>
              {row.inputs.map(({ name, label, type, placeholder }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-slate-700 mb-1 dark:text-gray-200">
                    {label}
                  </label>
                  <input 
                    type={type} 
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full border border-slate-300 dark:border-gray-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-800 dark:text-white"
                    required 
                  />
                </div>
              ))}
            </div>
          ))}

          {/* Ligne 3 : Choix du Véhicule (select dynamique par optgroup) */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 dark:text-gray-200">
              Véhicule souhaité
            </label>
            <select 
              name="vehicule"
              value={formData.vehicule}
              onChange={handleChange}
              className="w-full border border-slate-300 dark:border-gray-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-800 dark:text-white"
              required
            >
              <option value="">-- Choisir un véhicule (ou laissez-nous vous conseiller) --</option>
              {VEHICULES_OPTIONS.map((group, idx) => (
                <optgroup key={idx} label={group.category} className="dark:bg-gray-800 text-blue-800 dark:text-blue-400 font-semibold">
                  {group.items.map((car) => (
                    <option key={car.value} value={car.value} className="dark:bg-gray-900 dark:text-white font-normal">
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
                  <label className="block text-sm font-medium text-slate-700 mb-1 dark:text-gray-200">
                    {label}
                  </label>
                  <input 
                    type={type} 
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full border border-slate-300 dark:border-gray-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-800 dark:text-white"
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
        </form>

        {/* ─── COLONNE 2 : INFOS & MAP ─── */}
        <div className="reveal-init space-y-6">
          <div className="bg-blue-50 dark:bg-gray-800 p-8 rounded-2xl space-y-6 border border-slate-100 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-2 dark:text-white flex items-center gap-2">
                📍 Agence MK Auto
              </h2>
              <div className="text-slate-600 space-y-1 dark:text-gray-300">
                <p>MK, Narjiss Rue Noble</p>
                <p>Fes, Maroc</p>
              </div>
            </div>

            {/* Coordonnées mappées */}
            <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-gray-700">
              {CONTACT_INFOS.map(({ id, icon, prefix, label, href, target, hoverClass }) => (
                <a 
                  key={id}
                  href={href}
                  target={target}
                  rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                  className={`text-slate-600 dark:text-gray-300 transition flex items-center gap-2 ${hoverClass}`}
                >
                  <span>{icon}</span>
                  <span className="font-medium">{prefix}</span>
                  <span>{label}</span>
                </a>
              ))}
            </div>

            {/* Horaires mappés */}
            <div className="pt-2 border-t border-slate-200 dark:border-gray-700">
              <h2 className="text-lg font-bold text-slate-800 mb-2 dark:text-white flex items-center gap-2">
                🕒 Horaires d'ouverture
              </h2>
              <ul className="text-slate-600 space-y-1 dark:text-gray-300 text-sm">
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
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-gray-700 shadow-sm h-64">
            <iframe
              title="Carte Agence MK Auto Abidjan"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.25!2d-4.9818!3d34.0045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9f8b4e78b1d9ed%3A0x86f6d0f1b2a3c4d5!2sNarjiss%2C%20F%C3%A8s%2C%20Maroc!5e0!3m2!1sfr!2sma!4v1710000000000!5m2!1sfr!2sma"              width="100%"
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