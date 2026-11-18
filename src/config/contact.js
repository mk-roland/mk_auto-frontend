// src/config/contact.js
// Coordonnées de l'agence : UN SEUL endroit à modifier.
export const CONTACT = {
  ville: "Abidjan, Côte d'Ivoire",
  telephone: '+225 01 01 03 03 63',
  telephoneLien: '+2250101030363',
  whatsapp: '2250101030363', // format international, sans + ni espaces
  email: 'contact@mkauto.ci',
  formspree: 'https://formspree.io/f/xbdnkajp',
};

// Lien WhatsApp avec un message pré-rempli
export const whatsappUrl = (message = '') =>
  `https://wa.me/${CONTACT.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
