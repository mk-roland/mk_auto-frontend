import { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { ThemeContext } from '../contexts/themeContextValue';
import { appNav } from '../data/AppNav.js';
import Logo from './Logo';

// Lien de navigation : la page courante est en jaune avec un tiret de marquage dessous
const desktopLinkClass = ({ isActive }) =>
  `relative py-2 font-display text-lg font-semibold uppercase tracking-wide transition-colors ${
    isActive
      ? 'text-signal-500 after:absolute after:left-0 after:-bottom-1 after:h-1 after:w-6 after:bg-signal-500'
      : 'text-asphalt-200 hover:text-white'
  }`;

const mobileLinkClass = ({ isActive }) =>
  `block w-full px-4 py-3 font-display text-2xl font-semibold uppercase border-l-4 transition-colors ${
    isActive ? 'border-signal-500 text-signal-500' : 'border-transparent text-asphalt-100 hover:text-white'
  }`;

export default function Navbar() {
  const { theme, handleThemeSwitch } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="bg-asphalt-950 text-white sticky top-0 z-50 border-b border-asphalt-800">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 h-16">

        <Link to="/" className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-signal-500" aria-label="MK Auto, accueil">
          <Logo />
          <span className="hidden lg:block font-display text-sm font-semibold uppercase tracking-[0.2em] text-asphalt-400">
            Location · Abidjan
          </span>
        </Link>

        <ul className="hidden md:flex gap-8 items-center">
          {appNav.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path} end={item.path === '/'} className={desktopLinkClass}>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link to="/contact" className="btn-signal hidden sm:inline-flex !py-2 !px-4 !text-base">
            Réserver
          </Link>
          <button
            onClick={handleThemeSwitch}
            className="p-2 rounded-sm text-asphalt-200 hover:text-white hover:bg-asphalt-800 transition-colors cursor-pointer"
            aria-label={theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={toggleMenu}
            className="p-2 md:hidden rounded-sm text-asphalt-100 hover:bg-asphalt-800 cursor-pointer"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div onClick={toggleMenu} className="absolute top-full left-0 w-full bg-asphalt-950 border-b border-asphalt-800 py-4 md:hidden">
          <nav className="flex flex-col gap-1 px-2">
            {appNav.map((item) => (
              <NavLink key={item.path} to={item.path} end={item.path === '/'} className={mobileLinkClass}>
                {item.name}
              </NavLink>
            ))}
          </nav>
          <div className="px-6 pt-4">
            <Link to="/contact" className="btn-signal w-full">Réserver un véhicule</Link>
          </div>
        </div>
      )}
    </header>
  );
}
