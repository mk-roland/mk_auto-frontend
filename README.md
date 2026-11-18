# MK Auto — Location de véhicules à Abidjan

Site vitrine de location de voitures : catalogue filtrable, fiches véhicules,
réservation par WhatsApp ou par formulaire.

**Technologies :** React 19, Vite 8, React Router 7, Tailwind CSS 4, GSAP 3, Formspree.

## Démarrer

```bash
npm install
npm run dev        # site en local
npm run lint       # vérification du code
npm run build      # version de production (dossier dist/)
```

## Documentation

- [`docs/FONCTIONNALITES.md`](docs/FONCTIONNALITES.md) : ce que fait chaque page,
  où se trouve le code, comment modifier les coordonnées ou ajouter un véhicule,
  et ce qui a été corrigé.

## Modifier rapidement

| Je veux changer… | Fichier |
|---|---|
| Téléphone, WhatsApp, e-mail, ville | `src/config/contact.js` |
| Les véhicules et leurs prix | `src/data/vehicleData.js` (+ photos dans `public/image/cars/`) |
| Les horaires | `src/data/reservationData.js` |
| Les témoignages | `src/data/temoignages.js` |
