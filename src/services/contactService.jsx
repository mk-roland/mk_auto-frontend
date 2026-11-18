// src/services/contactService.jsx
import { CONTACT } from '../config/contact';

/**
 * Envoie la demande de réservation via Formspree.
 */
export const sendViaFormspree = async (formData) => {
  const response = await fetch(CONTACT.formspree, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'envoi du message.");
  }

  return response;
};
