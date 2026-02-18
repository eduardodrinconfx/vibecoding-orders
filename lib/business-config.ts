// ============================================================
// CONFIGURACIÓN DEL NEGOCIO — Edita estos valores con tus datos reales
// Busca "PLACEHOLDER" para encontrar lo que debes cambiar
// ============================================================

export const businessConfig = {
  name: "VibeCoding",
  type: "Cafetería y Restaurante",
  tagline: "Cafetería • Restaurante • Stand-up",

  // --- Contacto (NAP: Name, Address, Phone) ---
  contact: {
    phone: "+58 412-555-1234",        // PLACEHOLDER — Tu número real
    whatsapp: "584125551234",          // PLACEHOLDER — Mismo número sin espacios ni guiones
    email: "info@vibecoding.com",      // PLACEHOLDER — Tu email real
  },

  address: {
    street: "Av. Principal, Local 5",  // PLACEHOLDER
    neighborhood: "Las Mercedes",      // PLACEHOLDER
    city: "Caracas",                   // PLACEHOLDER
    state: "Distrito Capital",         // PLACEHOLDER
    country: "Venezuela",
    postalCode: "1060",                // PLACEHOLDER
    full: "Av. Principal, Local 5, Las Mercedes, Caracas", // PLACEHOLDER
  },

  // --- Horarios ---
  hours: {
    cafeteria: { label: "Cafetería Mañanera", hours: "6:00 AM - 12:00 PM" },
    restaurante: { label: "Menú del Día", hours: "12:00 PM - 6:00 PM" },
    premium: { label: "Premium Stand-up", hours: "6:00 PM - 12:00 AM" },
  },
  openingHoursSummary: "Lunes a Domingo, 6:00 AM - 12:00 AM",

  // --- Redes sociales ---
  social: {
    instagram: "https://instagram.com/vibecoding", // PLACEHOLDER
    facebook: "",  // PLACEHOLDER — Dejar vacío si no tienes
    twitter: "",   // PLACEHOLDER — Dejar vacío si no tienes
  },

  // --- SEO ---
  seo: {
    title: "VibeCoding — Cafetería y Restaurante en Las Mercedes, Caracas",
    description:
      "Cafetería mañanera, menú del día y experiencia premium con stand-up. Pedidos online fáciles. Ubicados en Las Mercedes, Caracas.",
    keywords: [
      "cafetería caracas",
      "restaurante las mercedes",
      "comida caracas",
      "pedidos online restaurante",
      "cafetería las mercedes",
    ],
  },

  // --- Coordenadas Google Maps (PLACEHOLDER — Obtén las reales de Google Maps) ---
  geo: {
    latitude: "10.4989",
    longitude: "-66.8535",
  },

  // --- URLs ---
  urls: {
    website: "https://vibecoding-orders.vercel.app",
    ordering: "https://vibecoding-orders.vercel.app/pedido",
  },
}
