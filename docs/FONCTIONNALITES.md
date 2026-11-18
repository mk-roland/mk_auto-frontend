# Fonctionnalités du site MK Auto

Ce document décrit **ce que fait le site**, page par page, **où se trouve le
code** de chaque fonctionnalité, et ce qui a été corrigé côté qualité,
ergonomie et sécurité.

L'organisation et les animations reprennent celles de **Zenith Bridge** (même
technologie : React + Vite + React Router + Tailwind 4 + GSAP), avec la
validation de formulaire de **Dabali 35** et le composant `Field` de **Zenab Glass**.

---

## 1. Vue d'ensemble

| Élément | Technologie |
|---|---|
| Interface | React 19 + Vite 8 |
| Style | Tailwind CSS 4 (mode sombre via la classe `.dark`) |
| Navigation | React Router 7 |
| Animations | GSAP 3 + `@gsap/react` |
| Icônes | lucide-react |
| Formulaire | Formspree (aucun serveur à gérer) |
| Réservation directe | WhatsApp (message pré-rempli) |

Commandes utiles :

```bash
npm install        # installer les dépendances
npm run dev        # lancer le site en local
npm run lint       # vérifier la qualité du code
npm run build      # générer la version de production (dossier dist/)
npm run preview    # tester la version de production en local
```

### Organisation des dossiers

```
src/
├── config/contact.js          ← téléphone, WhatsApp, e-mail, ville, Formspree (UN seul endroit)
├── lib/gsap.js                ← configuration centrale de GSAP
├── hooks/                     ← logique réutilisable
│   ├── useReveal.js           ← apparition au scroll (attribut data-reveal)
│   ├── useSequence.js         ← cartes une par une + icônes dessinées (data-sequence)
│   └── useErreurs.js          ← validation des formulaires en français
├── components/
│   ├── home/Hero.jsx          ← hero de l'accueil avec motion design
│   ├── ui/Field.jsx           ← champ de formulaire (libellé + message d'erreur)
│   ├── contact/               ← formulaire de réservation, infos agence, coche de succès
│   ├── SectionHeader.jsx      ← en-tête commun (sur-titre, titre, sous-titre)
│   ├── VehicleCard.jsx        ← carte d'un véhicule
│   ├── TemoignageCard.jsx     ← carte d'un témoignage
│   ├── EngagementCard.jsx     ← carte « Pourquoi choisir MK Auto »
│   └── Navbar, Footer, Layout
├── contexts/                  ← thème clair / sombre
├── pages/                     ← une page = un assemblage de composants
├── data/                      ← véhicules, témoignages, engagements, menu, formulaire
├── services/contactService.jsx ← envoi du formulaire à Formspree
└── routes.jsx                 ← liste des pages
```

**Règle suivie :** les pages assemblent, les composants affichent, les hooks
contiennent la logique, les services parlent à l'extérieur, la config contient
les informations qui changent.

---

## 2. Fonctionnalités communes à toutes les pages

### Barre de navigation — `components/Navbar.jsx`
- La **page courante est soulignée en bleu** (ordinateur) ou surlignée (menu mobile).
- Bouton **thème clair / sombre**, mémorisé dans le navigateur (`contexts/ThemeContext.jsx`).
- Menu mobile avec libellés accessibles (« Ouvrir le menu » / « Fermer le menu »).

### Transition entre les pages — `components/Layout.jsx`
- À chaque changement de page, le site **remonte en haut** puis le contenu
  entre en fondu avec un léger glissement.
- Changer un filtre du catalogue ne relance pas la transition (seule l'adresse
  `?categorie=...` change, pas la page).

### Page 404 — `pages/NotFound.jsx`
- Toute adresse inconnue affiche une vraie page 404 (route `*` dans `routes.jsx`).
- Une voiture avance et recule en boucle ; deux boutons ramènent à l'accueil
  ou au catalogue.

### Apparition au scroll — `hooks/useReveal.js`
- Tout élément avec l'attribut **`data-reveal`** apparaît en glissant quand il
  entre à l'écran, par petits groupes en cascade.
- Pour l'utiliser dans une page :

```jsx
const scope = useRef(null);
useReveal(scope);
return <div ref={scope}><div data-reveal>…</div></div>;
```

### Accessibilité des animations
- Si l'utilisateur a demandé **« réduire les animations »** dans son système,
  aucune animation GSAP n'est jouée et tout le contenu est visible immédiatement.
- Une règle CSS dans `index.css` coupe aussi les transitions CSS dans ce cas.
- Sans JavaScript, le contenu reste visible (l'état caché est posé par JS).

---

## 3. Page d'accueil — `pages/Home.jsx`

- **Hero** : accroche, deux boutons (« Voir nos véhicules », « Réservation rapide »)
  et un badge **« À partir de … FCFA / jour »** calculé automatiquement depuis
  le prix le plus bas de la flotte.

### Motion design du hero — `components/home/Hero.jsx`
Une timeline GSAP d'environ 3 secondes au chargement :
1. les deux halos lumineux s'allument ;
2. le badge « Location premium à Abidjan » tombe en place, l'étincelle tourne ;
3. le titre monte **mot par mot** derrière un masque (SplitText) ;
4. un **trait jaune se dessine** sous « sérénité » (DrawSVG) ;
5. le texte puis les boutons arrivent ;
6. le cadre photo **s'ouvre de gauche à droite** et la voiture entre en glissant ;
7. le badge de prix rebondit et le **compteur défile** de 0 au prix minimum.

Ensuite, en continu et discrètement : la voiture flotte, les halos dérivent,
les **marquages de route** jaunes défilent en bas du hero, le visuel s'incline
légèrement en suivant la souris (ordinateur) et se décale au scroll (parallaxe).

### Cartes une par une — `hooks/useSequence.js`
Sections « Pourquoi choisir MK Auto » et « Témoignages » : quand la rangée entre
à l'écran, **la carte 1 apparaît, son icône se dessine trait par trait, puis la
carte 2**, etc. Les étoiles des témoignages se tracent une à une puis se remplissent.

```jsx
<div data-sequence>                 {/* la rangée */}
  <div data-item>                   {/* chaque carte */}
    <div data-icon-box>             {/* support d'icône qui rebondit */}
      <Car data-draw />             {/* icône dessinée */}
    </div>
    <Star data-draw data-fill />    {/* dessinée puis remplie */}
  </div>
</div>
```

Comme le reste des animations, rien de tout cela ne se joue si l'utilisateur a
demandé à réduire les animations : le contenu est affiché directement.
- **Pourquoi choisir MK Auto** : 3 engagements (`data/engagementData.js`).
- **Témoignages** : étoiles, avatar avec initiales (`data/temoignages.js`).
  Pour changer la note d'un témoignage, ajouter `note: 4` à l'entrée (5 par défaut).

## 4. Catalogue — `pages/Catalogue.jsx`

- **4 filtres** : catégorie, énergie, boîte de vitesse, marque.
- **Tri** par pertinence, prix croissant ou prix décroissant.
- Les filtres et le tri sont **gardés dans l'adresse** (`/catalogue?categorie=SUV%20%26%204x4&tri=prix-asc`) :
  on peut partager le lien ou revenir en arrière sans perdre sa recherche.
- Aucun résultat : un message et un bouton « Afficher tous les véhicules ».
- Les cartes réapparaissent en cascade quand on change un filtre.

### Ajouter un véhicule
Ajouter une entrée dans `data/vehicleData.js` (avec un `id` unique) et la photo
dans `public/image/cars/`. Le nom du fichier doit correspondre **exactement**,
majuscules comprises : `Peugeot-3008.jpeg` ≠ `peugeot-3008.jpg`.
Le véhicule apparaît automatiquement dans le catalogue **et** dans la liste du
formulaire de réservation.

## 5. Fiche véhicule — `pages/VehiculeDetail.jsx`

- Photo, prix par jour, places, boîte, énergie, description, inclusions.
- **« Réserver via WhatsApp »** : ouvre WhatsApp avec un message pré-rempli
  (nom du véhicule + référence).
- **« Demander par formulaire »** : ouvre `/contact?vehicule=ID` avec le
  véhicule **déjà sélectionné**, pour les clients sans WhatsApp.
- Identifiant inconnu : message « Véhicule introuvable » et retour au catalogue.

## 6. Contact & réservation — `pages/Contact.jsx`

La page assemble deux composants :

### Formulaire — `components/contact/ReservationForm.jsx`
- **Liste des véhicules générée depuis le catalogue**, regroupée par catégorie
  et triée par prix. Option **« Je ne sais pas encore : conseillez-moi »**.
- **Dates contrôlées** : pas de départ dans le passé, retour après le départ.
- **Récapitulatif en direct** : durée et prix estimé (ex. « 3 jours · 135 000 FCFA »).
- **Validation en français** (`hooks/useErreurs.js`) : un message précis sous
  chaque champ, et le curseur va sur le premier champ en erreur.
- Chaque libellé est **relié à son champ** (`components/ui/Field.jsx`) : cliquer
  sur « Nom » place le curseur dans le champ, et les lecteurs d'écran lisent
  le libellé et l'erreur.
- **Envoi réussi** : message vert avec une **coche dessinée** (`SuccessCheck.jsx`).
- **Erreur** : le formulaire **tremble** et un message propose le téléphone ou WhatsApp.
  Ce que le client a saisi est conservé.
- **Anti-spam** : un champ invisible (`_gotcha`) piège les robots.
- L'agence reçoit des informations lisibles : nom du véhicule, référence,
  dates, durée et estimation (pas seulement un identifiant).

### Infos agence — `components/contact/AgenceInfos.jsx`
- Ville, téléphone, WhatsApp, e-mail, horaires (`data/reservationData.js`) et carte Google Maps.

---

## 7. Modifier les informations de contact

Tout est dans **`src/config/contact.js`** :

```js
export const CONTACT = {
  ville: "Abidjan, Côte d'Ivoire",
  telephone: '+225 01 01 03 03 63',     // affiché
  telephoneLien: '+2250101030363',      // pour le lien tel:
  whatsapp: '2250101030363',            // sans + ni espaces
  email: 'contact@mkauto.ci',
  formspree: 'https://formspree.io/f/xbdnkajp',
};
```

Modifie ici et tout le site suit : page Contact, fiche véhicule (WhatsApp),
envoi du formulaire.

Les horaires sont dans `data/reservationData.js` (`HORAIRES`), l'adresse de la
carte dans `components/contact/AgenceInfos.jsx`.

---

## 8. Qualité, ergonomie et sécurité : ce qui a été corrigé

| Problème | Correction |
|---|---|
| Le site ne se compilait pas sous Linux (Vercel, Netlify…) : imports `Layout` / `contactService` avec la mauvaise casse | Fichiers renommés |
| Photo de la Peugeot 3008 introuvable | Fichier renommé |
| Adresse à Fès, téléphone et e-mail ivoiriens | Agence à Abidjan, coordonnées dans `config/contact.js` |
| Liste du formulaire : 5 véhicules dont 2 absents du catalogue | Générée depuis le catalogue (28 véhicules) |
| Option « laissez-nous vous conseiller » impossible à envoyer | Vraie valeur `conseil` |
| Dates passées ou retour avant départ acceptés | Contrôle des dates + récapitulatif |
| Fiche ouverte en bas de page après un clic dans le catalogue | Retour en haut à chaque page |
| Libellés non reliés aux champs | `htmlFor` / `id` partout, erreurs reliées par `aria-describedby` |
| Adresse inconnue = page vide | Page 404 |
| `alert()` après l'envoi | Message dans la page |
| Placeholder du téléphone = numéro de l'agence | Exemple neutre |
| Code mort « Bonjour Chez Christy » (copié d'un autre projet) | Supprimé |
| Animations jouées même avec « réduire les animations » | Respect de `prefers-reduced-motion` |
| 13 failles connues dans les dépendances (dont `react-router` et `vite`) | `npm audit fix` : 8 corrigées |
| ESLint : 8 erreurs | 0 erreur |

### Failles restantes (outils de développement uniquement)
`npm audit` signale encore 5 failles liées à `picomatch`, utilisé par **Vite
pendant le développement**. Elles ne sont pas présentes dans le site publié
(`dist/`). Le seul correctif proposé (`npm audit fix --force`) ferait
**redescendre** Vite à une version plus ancienne : à ne pas lancer. Refaire
`npm audit fix` quand Vite publiera une mise à jour.

### Ce qu'il reste à faire de ton côté
- **Adresse précise** de l'agence (quartier, rue) : `config/contact.js` et la carte.
- **Liens des réseaux sociaux** : `components/social/SocialLink.jsx` pointe
  encore vers les pages d'accueil génériques (twitter.com, facebook.com…).
- **Disponibilité** : le badge « Disponible immédiatement » est affiché sur
  toutes les fiches. À piloter par une donnée `disponible` par véhicule si besoin.
- **Hébergement** : sur Vercel ou Netlify, ajouter une redirection de toutes les
  adresses vers `index.html`, sinon recharger `/catalogue` affiche une erreur 404
  de l'hébergeur (voir la section « Configuration Vercel » de la doc Zenith Bridge).

---

## 9. Poids ajouté par GSAP

GSAP (avec ScrollTrigger, DrawSVG et SplitText) fait passer le JavaScript du site
d'environ **87 Ko à 137 Ko** une fois compressé (gzip). Seuls les plugins
réellement utilisés sont importés dans `lib/gsap.js` : pour en ajouter un,
l'importer et l'enregistrer dans ce fichier uniquement.
