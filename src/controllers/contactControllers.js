import axios from "axios";
import { CONTACTOS_URL,HEADERS,HUBSPOT_API_BASE,HUBSPOT_API_KEY } from "../config/hubspot.js";

// Configuración de controlador
const headers = HEADERS;


// Crear un nuevo contacto
export const createContact = async (req, res) => {
  try {
    const { firstname, lastname, email, phone } = req.body;
    const response = await axios.post(
      CONTACTOS_URL,
      {
        properties: { firstname, lastname, email, phone },
      },
      { headers }
    );
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error al crear contacto:', error.response?.data || error.message);
    res.status(500).json({ error: 'No se pudo crear el contacto' });
  }
};

// Obtener todos los contactos
export const getAllContacts = async (req, res) => {
	console.log(CONTACTOS_URL);
  try {
    const response = await axios.get(`${CONTACTOS_URL}`, { headers });
		console.log(response);
    res.status(200).json(response.data.results);
  } catch (error) {
    console.error('Error al obtener contactos:', error.response?.data || error.message);
    res.status(500).json({ error: 'No se pudieron obtener los contactos' });
  }
};

// Obtener contacto por ID
export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${HUBSPOT_API_BASE}/${id}`, { headers });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error al obtener contacto por ID:', error.response?.data || error.message);
    res.status(404).json({ error: 'Contacto no encontrado' });
  }
};

// Obtener contacto por email
export const getContactByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const response = await axios.get(
      `${HUBSPOT_API_BASE}search`,
      {
        headers,
        data: {
          filterGroups: [
            {
              filters: [
                {
                  propertyName: 'email',
                  operator: 'EQ',
                  value: email,
                },
              ],
            },
          ],
        },
      }
    );
    res.status(200).json(response.data.results);
  } catch (error) {
    console.error('Error al buscar contacto por email:', error.response?.data || error.message);
    res.status(404).json({ error: 'Contacto no encontrado por email' });
  }
};

// Actualizar contacto por ID
export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, phone } = req.body;
    const response = await axios.patch(
      `${HUBSPOT_API_BASE}/${id}`,
      {
        properties: { firstname, lastname, email, phone },
      },
      { headers }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error al actualizar contacto:', error.response?.data || error.message);
    res.status(500).json({ error: 'No se pudo actualizar el contacto' });
  }
};

// Eliminar contacto por ID
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    await axios.delete(`${HUBSPOT_API_BASE}/${id}`, { headers });
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error al eliminar contacto:', error.response?.data || error.message);
    res.status(500).json({ error: 'No se pudo eliminar el contacto' });
  }
};
