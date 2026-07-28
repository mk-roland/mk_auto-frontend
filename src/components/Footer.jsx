import { Link } from 'react-router-dom';
import { appNav } from '../data/AppNav.js';
import SocialLinks from './social/SocialLink.jsx';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-8 px-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-items-center">
      
      {/* 1. Droits d'auteur */}
      <p className="text-sm text-slate-400">
        &copy; {currentYear} <span className="font-semibold text-white">MK Auto</span>. Tous droits réservés.
      </p>

      {/* 2. Navigation */}
      <nav>
        <ul className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
          {appNav.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="hover:text-blue-400 transition-colors"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 3. Réseaux Sociaux */}
      <SocialLinks />

    </footer>
  );
}