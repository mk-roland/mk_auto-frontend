import { MapPin, Clock } from 'lucide-react';
import { CONTACT_INFOS, HORAIRES } from '../../data/reservationData';
import { CONTACT } from '../../config/contact';

// Colonne de droite de la page Contact : adresse, coordonnées, horaires, carte.
export default function AgenceInfos() {
  return (
    <div data-reveal className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl space-y-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2 dark:text-white flex items-center gap-2">
            <MapPin size={20} className="text-blue-600 dark:text-blue-400" /> Agence MK Auto
          </h2>
          <p className="text-slate-600 dark:text-slate-300">{CONTACT.ville}</p>
        </div>

        {/* Coordonnées */}
        <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          {CONTACT_INFOS.map(({ id, icon: Icon, prefix, label, href, target, hoverClass }) => (
            <a
              key={id}
              href={href}
              target={target}
              rel={target === '_blank' ? 'noopener noreferrer' : undefined}
              className={`text-slate-600 dark:text-slate-300 transition flex items-center gap-2 py-1 ${hoverClass}`}
            >
              <Icon size={18} className="shrink-0 text-slate-400" />
              <span className="font-medium">{prefix}</span>
              <span>{label}</span>
            </a>
          ))}
        </div>

        {/* Horaires */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 mb-2 dark:text-white flex items-center gap-2">
            <Clock size={20} className="text-blue-600 dark:text-blue-400" /> Horaires d'ouverture
          </h2>
          <ul className="text-slate-600 space-y-1 dark:text-slate-300 text-sm">
            {HORAIRES.map(({ jours, heures }) => (
              <li key={jours} className="flex justify-between">
                <span className="font-semibold">{jours}</span>
                <span>{heures}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Carte Google Maps */}
      <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm h-64">
        <iframe
          title="Carte : agence MK Auto à Abidjan"
          src="https://www.google.com/maps?q=Abidjan,+C%C3%B4te+d%27Ivoire&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
