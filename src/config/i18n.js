// src/config/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome to GadgiHub",
      home: "Home",
      services: "Services",
      pricing: "Pricing",
      contact: "Contact",
      search: "Search...",
      dashboard: "Dashboard",
      settings: "Settings",
      earnings: "Earnings",
      sign_out: "Sign out",
    },
  },
  es: {
    translation: {
      welcome: "Bienvenido a GadgiHub",
      home: "Inicio",
      services: "Servicios",
      pricing: "Precios",
      contact: "Contacto",
      search: "Buscar...",
      dashboard: "Tablero",
      settings: "Configuraciones",
      earnings: "Ganancias",
      sign_out: "Cerrar sesión",
    },
  },
  fr: {
    translation: {
      welcome: "Bienvenue à GadgiHub",
      home: "Accueil",
      services: "Services",
      pricing: "Tarification",
      contact: "Contact",
      search: "Chercher...",
      dashboard: "Tableau de bord",
      settings: "Paramètres",
      earnings: "Gains",
      sign_out: "Se déconnecter",
    },
  },
  de: {
    translation: {
      welcome: "Willkommen bei GadgiHub",
      home: "Startseite",
      services: "Dienstleistungen",
      pricing: "Preisgestaltung",
      contact: "Kontakt",
      search: "Suche...",
      dashboard: "Armaturenbrett",
      settings: "Einstellungen",
      earnings: "Verdienste",
      sign_out: "Ausloggen",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
