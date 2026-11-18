import { Link } from 'react-router-dom';
import { appNav } from '../data/AppNav.js';
import { CONTACT, whatsappUrl } from '../config/contact';
import { HORAIRES } from '../data/reservationData';
import SocialLinks from './social/SocialLink.jsx';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-asphalt-950 text-asphalt-300">
      {/* Marquage au sol */}
      <div className="road-dashes h-1" aria-hidden="true"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed">
            Location de voitures à {CONTACT.ville.split(',')[0]}, à la journée.
            De la citadine au minibus.
          </p>
        </div>

        <nav aria-label="Pied de page">
          <h2 className="font-sign text-lg font-bold text-white mb-3">Le site</h2>
          <ul className="space-y-2 text-sm">
            {appNav.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="hover:text-signal-500 transition-colors">{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sign text-lg font-bold text-white mb-3">Nous joindre</h2>
          <ul className="space-y-2 text-sm">
            <li><a href={`tel:${CONTACT.telephoneLien}`} className="hover:text-signal-500 transition-colors">{CONTACT.telephone}</a></li>
            <li><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-signal-500 transition-colors">WhatsApp</a></li>
            <li><a href={`mailto:${CONTACT.email}`} className="hover:text-signal-500 transition-colors">{CONTACT.email}</a></li>
          </ul>
        </div>

        <div>
          <h2 className="font-sign text-lg font-bold text-white mb-3">Horaires</h2>
          <ul className="space-y-2 text-sm">
            {HORAIRES.map(({ jours, heures }) => (
              <li key={jours} className="flex justify-between gap-4 max-w-56">
                <span>{jours}</span><span className="text-white">{heures}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-asphalt-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-sm">
          <p>&copy; {currentYear} MK Auto. Tous droits réservés.</p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
