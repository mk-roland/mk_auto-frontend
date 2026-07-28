import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Car, Sun, Moon, Menu, X } from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext';
import { appNav } from '../data/AppNav.js';

export default function Navbar() {
  const { theme, handleThemeSwitch } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="bg-slate-900 text-white p-4 sticky top-0 z-50 border-b border-slate-800">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-blue-600 p-2 rounded-xl group-hover:bg-blue-500 transition-colors">
            <Car size={26} className="text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-wider text-white">MK AUTO</h1>
            <span className="text-[10px] uppercase font-semibold text-blue-400 tracking-widest">
              Location de Véhicules
            </span>
          </div>
        </Link>

        {/* Navigation Desktop */}
        <ul className="hidden sm:flex space-x-6 list-none items-center">
          {appNav.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="hover:text-blue-400 font-medium transform transition-all duration-300 block"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions (Toggle Theme + Mobile Menu Button) */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleThemeSwitch}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={toggleMenu}
            className="p-2 sm:hidden text-slate-200 hover:text-white hover:cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <section
          onClick={toggleMenu}
          className="absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 text-white flex flex-col items-center py-6 sm:hidden shadow-2xl"
        >
          <nav className="flex flex-col items-center gap-6 text-lg font-medium">
            {appNav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="hover:text-blue-400 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </section>
      )}
    </header>
  );
}