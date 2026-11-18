import { Phone, MessageCircle, Mail } from 'lucide-react';
import { VEHICULES_DATA, FILTER_OPTIONS } from './vehicleData';
import { CONTACT, whatsappUrl } from '../config/contact';

// Valeur de l'option « laissez-nous vous conseiller »
export const OPTION_CONSEIL = 'conseil';

// Champs texte du formulaire (les dates et le véhicule sont gérés à part)
export const FORM_FIELDS = [
  { name: "nom", label: "Nom", type: "text", placeholder: "Ex : Kouassi", autoComplete: "family-name" },
  { name: "prenom", label: "Prénom", type: "text", placeholder: "Ex : Aya", autoComplete: "given-name" },
  { name: "telephone", label: "Téléphone", type: "tel", placeholder: "Ex : 07 00 00 00 00", autoComplete: "tel" },
  { name: "email", label: "Adresse e-mail", type: "email", placeholder: "Ex : aya.kouassi@email.com", autoComplete: "email" },
];

// Libellé d'un véhicule dans la liste : « Peugeot 208 · Essence · 25 000 FCFA/jour »
export const libelleVehicule = (v) =>
  `${v.nom} · ${v.energie} · ${v.prix.toLocaleString('fr-FR')} FCFA/jour`;

// Liste générée depuis le catalogue : elle reste toujours à jour,
// regroupée dans le même ordre de catégories que les filtres.
export const VEHICULES_OPTIONS = FILTER_OPTIONS.categories
  .filter((cat) => cat !== "Toutes")
  .map((cat) => ({
    category: cat,
    items: VEHICULES_DATA
      .filter((v) => v.categorie === cat)
      .sort((a, b) => a.prix - b.prix)
      .map((v) => ({ value: String(v.id), label: libelleVehicule(v) })),
  }))
  .filter((group) => group.items.length > 0);

// Coordonnées affichées sur la page Contact
export const CONTACT_INFOS = [
  {
    id: "phone",
    icon: Phone,
    prefix: "Téléphone :",
    label: CONTACT.telephone,
    href: `tel:${CONTACT.telephoneLien}`,
    hoverClass: "hover:text-blue-600"
  },
  {
    id: "whatsapp",
    icon: MessageCircle,
    prefix: "WhatsApp :",
    label: CONTACT.telephone,
    href: whatsappUrl(),
    target: "_blank",
    hoverClass: "hover:text-emerald-600"
  },
  {
    id: "email",
    icon: Mail,
    prefix: "E-mail :",
    label: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    hoverClass: "hover:text-blue-600"
  }
];

// Horaires MK Auto
export const HORAIRES = [
  { jours: "Lundi - Samedi", heures: "08h00 - 19h00" },
  { jours: "Dimanche", heures: "Sur rendez-vous" }
];
