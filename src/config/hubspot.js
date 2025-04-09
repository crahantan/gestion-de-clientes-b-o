import dotenv from 'dotenv';
dotenv.config();

// Configuración de hubspot sobre ENDPOINTS Y HEADERS
const HUBSPOT_API_BASE = process.env.HUBSPOT_API_BASE || '';
const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY || '';

// Configuración de HEADERS
const HEADERS = {
  Authorization: `Bearer ${HUBSPOT_API_KEY}`,
  'Content-Type': 'application/json',
};

// Listado de ENDPOINTS
const CONTACTOS_URL = `${HUBSPOT_API_BASE}/crm/v3/objects/contacts`;

export {
	HUBSPOT_API_BASE,
	HUBSPOT_API_KEY,
  CONTACTOS_URL,
  HEADERS
};


