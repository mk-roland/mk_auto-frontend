import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import Field, { inputClass } from '../ui/Field';
import SuccessCheck from './SuccessCheck';
import { useErreurs } from '../../hooks/useErreurs';
import { sendViaFormspree } from '../../services/contactService';
import { gsap, MOTION } from '../../lib/gsap';
import { VEHICULES_DATA } from '../../data/vehicleData';
import { FORM_FIELDS, VEHICULES_OPTIONS, OPTION_CONSEIL, libelleVehicule } from '../../data/reservationData';

// Date du jour au format AAAA-MM-JJ (heure locale), pour l'attribut min des dates
const aujourdhui = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

// Nombre de jours de location (un aller-retour le même jour compte 1 jour)
const nombreJours = (depart, retour) => {
  if (!depart || !retour) return 0;
  const diff = (new Date(retour) - new Date(depart)) / 86400000;
  return diff < 0 ? 0 : Math.max(1, Math.round(diff));
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Règles de validation, avec des messages en français
const REGLES = {
  nom: (v) => (v.length < 2 ? 'Indiquez votre nom.' : null),
  prenom: (v) => (v.length < 2 ? 'Indiquez votre prénom.' : null),
  telephone: (v) => (v.replace(/\D/g, '').length < 8 ? 'Indiquez un numéro de téléphone valide (8 chiffres minimum).' : null),
  email: (v) => (!EMAIL_REGEX.test(v) ? 'Indiquez une adresse e-mail valide, par exemple nom@email.com.' : null),
  vehicule: (v) => (!v ? 'Choisissez un véhicule, ou « Je ne sais pas encore ».' : null),
  dateDepart: (v) => {
    if (!v) return 'Choisissez une date de départ.';
    if (v < aujourdhui()) return "La date de départ ne peut pas être dans le passé.";
    return null;
  },
  dateRetour: (v, tout) => {
    if (!v) return 'Choisissez une date de retour.';
    if (tout.dateDepart && v < tout.dateDepart) return 'La date de retour doit être après la date de départ.';
    return null;
  },
};

export default function ReservationForm() {
  const [searchParams] = useSearchParams();
  const formRef = useRef(null);

  // Véhicule pré-sélectionné depuis la fiche détail : /contact?vehicule=12
  const vehiculeParam = searchParams.get('vehicule');
  const vehiculeInitial = VEHICULES_DATA.some((v) => String(v.id) === vehiculeParam) ? vehiculeParam : '';

  const initialFormState = {
    nom: '', prenom: '', telephone: '', email: '',
    vehicule: vehiculeInitial, dateDepart: '', dateRetour: '', _gotcha: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // null | 'success' | 'error'
  const [successCount, setSuccessCount] = useState(0);
  const { erreurs, verifier, effacer, aria, idErreur } = useErreurs('reservation');

  const vehiculeChoisi = VEHICULES_DATA.find((v) => String(v.id) === formData.vehicule);
  const jours = nombreJours(formData.dateDepart, formData.dateRetour);
  const estimation = vehiculeChoisi && jours ? vehiculeChoisi.prix * jours : 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    effacer(name);
    if (status) setStatus(null);
  };

  // Petite secousse du formulaire en cas d'erreur (sauf si animations réduites)
  const shake = () => {
    gsap.matchMedia().add(MOTION, () => {
      gsap.fromTo(formRef.current, { x: -10 }, { x: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData._gotcha) return; // champ piège rempli = robot : on ignore
    if (!verifier(e.currentTarget, REGLES)) {
      shake();
      return;
    }

    setIsSubmitting(true);
    setStatus(null);
    try {
      // On envoie des libellés lisibles par l'agence, pas des identifiants
      await sendViaFormspree({
        nom: formData.nom.trim(),
        prenom: formData.prenom.trim(),
        telephone: formData.telephone.trim(),
        email: formData.email.trim().toLowerCase(),
        vehicule: vehiculeChoisi ? `${libelleVehicule(vehiculeChoisi)} (réf. #${vehiculeChoisi.id})` : 'À conseiller par l\'agence',
        dateDepart: formData.dateDepart,
        dateRetour: formData.dateRetour,
        duree: `${jours} jour${jours > 1 ? 's' : ''}`,
        estimation: estimation ? `${estimation.toLocaleString('fr-FR')} FCFA` : 'Non calculée',
      });
      setStatus('success');
      setSuccessCount((n) => n + 1);
      setFormData({ ...initialFormState, vehicule: '' });
    } catch (error) {
      console.error('Erreur :', error);
      setStatus('error');
      shake();
    } finally {
      setIsSubmitting(false);
    }
  };

  const champ = (name) => ({
    id: `reservation-${name}`,
    name,
    value: formData[name],
    onChange: handleChange,
    className: inputClass,
    ...aria(name),
  });

  return (
    <form
      ref={formRef}
      data-reveal
      noValidate
      onSubmit={handleSubmit}
      className="space-y-4 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800"
    >
      {/* Champ piège anti-spam : invisible pour les humains */}
      <input type="text" name="_gotcha" value={formData._gotcha} onChange={handleChange}
        tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {/* Identité et coordonnées */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FORM_FIELDS.map(({ name, label, type, placeholder, autoComplete }) => (
          <Field key={name} label={label} htmlFor={`reservation-${name}`} error={erreurs[name]} errorId={idErreur(name)}>
            <input type={type} placeholder={placeholder} autoComplete={autoComplete} {...champ(name)} />
          </Field>
        ))}
      </div>

      {/* Véhicule */}
      <Field label="Véhicule souhaité" htmlFor="reservation-vehicule" error={erreurs.vehicule} errorId={idErreur('vehicule')}>
        <select {...champ('vehicule')}>
          <option value="">Choisir un véhicule</option>
          <option value={OPTION_CONSEIL}>Je ne sais pas encore : conseillez-moi</option>
          {VEHICULES_OPTIONS.map((group) => (
            <optgroup key={group.category} label={group.category}>
              {group.items.map((car) => (
                <option key={car.value} value={car.value}>{car.label}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </Field>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Date de départ" htmlFor="reservation-dateDepart" error={erreurs.dateDepart} errorId={idErreur('dateDepart')}>
          <input type="date" min={aujourdhui()} {...champ('dateDepart')} />
        </Field>
        <Field label="Date de retour" htmlFor="reservation-dateRetour" error={erreurs.dateRetour} errorId={idErreur('dateRetour')}>
          <input type="date" min={formData.dateDepart || aujourdhui()} {...champ('dateRetour')} />
        </Field>
      </div>

      {/* Récapitulatif : durée et prix estimé */}
      {jours > 0 && (
        <div className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 px-4 py-3 text-sm" aria-live="polite">
          <span className="text-slate-600 dark:text-slate-300">
            Durée : <strong className="text-slate-900 dark:text-white">{jours} jour{jours > 1 ? 's' : ''}</strong>
          </span>
          {estimation > 0 && (
            <span className="text-slate-600 dark:text-slate-300">
              Estimation : <strong className="text-slate-900 dark:text-white">{estimation.toLocaleString('fr-FR')} FCFA</strong>
            </span>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-wait"
      >
        {isSubmitting ? 'Envoi en cours…' : 'Envoyer ma demande de disponibilité'}
      </button>

      {/* Retour après envoi */}
      {status === 'success' && (
        <p role="status" className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
          <SuccessCheck play={successCount} />
          Votre demande a bien été envoyée. Nous vous recontactons rapidement pour confirmer la disponibilité.
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300">
          <AlertCircle size={20} className="shrink-0" />
          Impossible d'envoyer la demande pour le moment. Réessayez ou contactez-nous par téléphone ou WhatsApp.
        </p>
      )}
    </form>
  );
}
