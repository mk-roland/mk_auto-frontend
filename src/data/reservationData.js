// Structure dynamique des champs textuels du formulaire
export const FORM_FIELDS = [
  {
    id: 1,
    gridClass: "grid grid-cols-1 md:grid-cols-2 gap-4",
    inputs: [
      { name: "nom", label: "Nom", type: "text", placeholder: "Kadjo" },
      { name: "prenom", label: "Prénom", type: "text", placeholder: "Marc" },
    ]
  },
  {
    id: 2,
    gridClass: "grid grid-cols-1 md:grid-cols-2 gap-4",
    inputs: [
      { name: "telephone", label: "Téléphone", type: "tel", placeholder: "+225 01 01 03 03 63" },
      { name: "email", label: "Adresse Email", type: "email", placeholder: "marc.kadjo@gmail.com" },
    ]
  },
  {
    id: 3,
    gridClass: "grid grid-cols-1 md:grid-cols-2 gap-4",
    inputs: [
      { name: "dateDepart", label: "Date de départ", type: "date" },
      { name: "dateRetour", label: "Date de retour", type: "date" },
    ]
  }
];

// Liste des catégories et modèles de véhicules MK Auto
export const VEHICULES_OPTIONS = [
  {
    category: "Citadines",
    items: [
      { value: "peugeot-208", label: "Peugeot 208 (Essence) - 25 000 FCFA/jour" },
      { value: "renault-clio", label: "Renault Clio 5 (Diesel) - 28 000 FCFA/jour" },
    ]
  },
  {
    category: "SUV",
    items: [
      { value: "peugeot-3008", label: "Peugeot 3008 (Diesel) - 45 000 FCFA/jour" },
      { value: "hyundai-tucson", label: "Hyundai Tucson (Hybride) - 50 000 FCFA/jour" },
    ]
  },
  {
    category: "Électriques / Prestige",
    items: [
      { value: "tesla-model-3", label: "Tesla Model 3 (Électrique) - 75 000 FCFA/jour" },
    ]
  }
];

// Contacts pour la colonne 2
export const CONTACT_INFOS = [
  {
    id: "phone",
    icon: "📞",
    prefix: "Téléphone :",
    label: "+225 01 01 03 03 63",
    href: "tel:+2250101030363",
    hoverClass: "hover:text-blue-500"
  },
  {
    id: "whatsapp",
    icon: "💬",
    prefix: "WhatsApp :",
    label: "+225 01 01 03 03 63",
    href: "https://wa.me/2250101030363",
    target: "_blank",
    hoverClass: "hover:text-emerald-600"
  },
  {
    id: "email",
    icon: "✉️",
    prefix: "Email :",
    label: "contact@mkauto.ci",
    href: "mailto:contact@mkauto.ci",
    hoverClass: "hover:text-blue-600"
  }
];

// Horaires MK Auto
export const HORAIRES = [
  { jours: "Lundi - Samedi", heures: "08h00 - 19h00" },
  { jours: "Dimanche", heures: "Sur rendez-vous" }
];