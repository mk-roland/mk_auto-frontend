import { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Car, Sun, Moon, Menu, X } from 'lucide-react';
import { ThemeContext } from '../contexts/themeContextValue';
import { appNav } from '../data/AppNav.js';

// Style d'un lien selon qu'il correspond à la page courante
const desktopLinkClass = ({ isActive }) =>
  `relative py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-blue-500'
      : 'text-slate-300 hover:text-white'
  }`;

const mobileLinkClass = ({ isActive }) =>
  `block w-full rounded-xl px-4 py-3 text-base font-medium transition-colors ${
    isActive ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
  }`;

export default function Navbar() {
  const { theme, handleThemeSwitch } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-800">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 py-3">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-blue-600 p-2 rounded-xl group-hover:bg-blue-500 transition-colors">
            <Car size={24} className="text-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold tracking-wide text-white">MK AUTO</span>
            <span className="text-xs font-medium text-slate-400">Location de véhicules</span>
          </div>
        </Link>

        {/* Navigation desktop */}
        <ul className="hidden sm:flex gap-8 items-center">
          {appNav.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path} end={item.path === '/'} className={desktopLinkClass}>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Thème + menu mobile */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleThemeSwitch}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
            aria-label={theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={toggleMenu}
            className="p-2 sm:hidden rounded-lg text-slate-200 hover:bg-slate-800 cursor-pointer"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div
          onClick={toggleMenu}
          className="absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 px-4 py-4 sm:hidden shadow-lg"
        >
          <nav className="flex flex-col gap-1">
            {appNav.map((item) => (
              <NavLink key={item.path} to={item.path} end={item.path === '/'} className={mobileLinkClass}>
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
