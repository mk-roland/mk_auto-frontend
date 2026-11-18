import { createContext } from 'react';

// Contexte séparé du Provider pour que le fast refresh de Vite fonctionne.
export const ThemeContext = createContext();
