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

		const id = response.data.id;

		console.log("Contacto registrado con éxito, con id", id);
  } catch (error) {
    console.error('Error al crear contacto:', error.response?.data || error.message);
    res.status(500).json({ error: 'No se pudo crear el contacto' });
  }
};

// Obtener todos los contactos
export const getAllContacts = async (req, res) => {
  try {
    const response = await axios.get(
			`${CONTACTOS_URL}`,
			{ 
				headers,
				params: {
          properties: 'firstname,lastname,email,phone'
        }
			},
		);
    res.status(200).json(response.data);
		console.log("Búsqueda de contactos completada con éxito");
  } catch (error) {
    console.error('Error al obtener contactos:', error.response?.data || error.message);
    res.status(500).json({ error: 'No se pudieron obtener los contactos' });
  }
};

// Obtener contacto por ID
export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
			`${CONTACTOS_URL}/${id}`,
			{
				headers,
				params: {
          properties: 'phone,firstname,lastname,email'
        }
			}
		);
    res.status(200).json(response.data);
		console.log("Búsqueda de contacto completada con éxito, con id: ",id);
  } catch (error) {
    console.error('Error al buscar contacto por id:', error.message);
		if(error.response?.status == 404){
			res.status(404).json({ error: 'Contacto no existe' });
		}else{
			res.status(error.response?.status).json({ error: 'Error interno'});
		}
  }
};

// Obtener contacto por email
export const getContactByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const response = await axios.post(
			`${CONTACTOS_URL}/search`,
			{
				filterGroups: [
					{
						filters: [
							{
								propertyName: 'email',
								operator: 'EQ',
								value: email
							}
						]
					},
				],	
				properties:['firstname','lastname','email','phone']
			},
			{ 
				headers 
			}
    );
    res.status(200).json({
			"body":response.data.results
		});
		console.log("Búsqueda de contacto completada con éxito, con email: ",email);
  } catch (error) {
    console.error('Error al buscar contacto por email:', error.message);
		if(error.response?.status == 404){
			res.status(404).json({ error: 'Contacto no existe' });
		}else{
			res.status(error.response?.status).json({ error: 'Error interno'});
		}
  }
};

// Actualizar contacto por ID
export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, phone } = req.body;
		const url = `${CONTACTOS_URL}/${id}`;

		// Validamos existencia de contacto
		await axios.get(
			url,
			{
				headers
			}
		).then( function (resp) {
			if(resp.status == 200){
				axios.patch(
					url,
					{
						properties: { firstname, lastname, email, phone },
					},
					{ 
						headers 
					}
				).then( function (response) {
					res.status(response.status).json(
						{
							'mensaje:': 'Actualización de contacto exitosa!',
							'body': response.data 
						});
					console.log("Actualización de Contacto con éxito, con id: ",id);
				});
			}
		});
  } catch (error) {
    console.error('Error al actualizar contacto:', error.message);
		if(error.response?.status == 404){
			res.status(404).json({ error: 'Contacto no existe' });
		}else{
			res.status(error.response?.status).json({ error: 'Error interno'});
		}
  }
};

// Eliminar contacto por ID
export const deleteContact = async (req, res) => {
    const { id } = req.params;
		const url = `${CONTACTOS_URL}/${id}`;
		try{
			// Validamos existencia de contacto
			await axios.get(
				url,
				{
					headers
				}
			).then (function (resp) {
				if(resp.status == 200){
					// Eliminamos contacto
					axios.delete(
						url,
						{
							headers
						}
					).then(function (response) {
						if(response.status == 204){
							res.status(204).send();
							console.log("Eliminación de contacto con éxito, con id: ",id);
						}
					});
				}
				});
		}catch (error) {
			console.error('Error al eliminar contacto:', error.message);
			if(error.response?.status == 404){
				res.status(404).json({ error: 'Contacto no existe' });
			}else{
				res.status(error.response?.status).json({ error: 'Error interno'});
			}
		}
};
