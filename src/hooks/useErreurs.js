// src/hooks/useErreurs.js
// Validation des formulaires avec des messages en français affichés sous chaque champ
// (au lieu des bulles du navigateur, parfois en anglais). Repris de Dabali 35.
import { useState } from 'react';

export function useErreurs(prefixe) {
  const [erreurs, setErreurs] = useState({});

  // regles : { nomDuChamp: (valeur, toutesLesValeurs) => message | null }
  // Renvoie true si tout est bon ; sinon affiche les messages et place le curseur sur le 1er champ en erreur.
  function verifier(form, regles) {
    const valeurs = Object.fromEntries(new FormData(form));
    const trouvees = {};
    for (const [nom, regle] of Object.entries(regles)) {
      const message = regle(String(valeurs[nom] ?? '').trim(), valeurs);
      if (message) trouvees[nom] = message;
    }
    setErreurs(trouvees);
    const premier = Object.keys(trouvees)[0];
    if (premier) form.elements.namedItem(premier)?.focus();
    return !premier;
  }

  const effacer = (nom) =>
    setErreurs((e) => {
      if (!e[nom]) return e;
      const reste = { ...e };
      delete reste[nom];
      return reste;
    });

  const idErreur = (nom) => `${prefixe}-${nom}-erreur`;

  // Attributs à poser sur le champ : état invalide + lien vers le message
  const aria = (nom) => ({
    'aria-invalid': Boolean(erreurs[nom]),
    'aria-describedby': erreurs[nom] ? idErreur(nom) : undefined,
  });

  return { erreurs, verifier, effacer, aria, idErreur };
}
