import CONFIG from './config.js';

const API_BASE = CONFIG.DOMINIO_DEV;


// Función de login
async function login() {
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	try {
		const res = await axios.post(`${API_BASE}/auth/login`, {
			username,
			password
		});

		const token = res.data.token;
		localStorage.setItem('token', token);
		alert('✅ Login exitoso');

		document.getElementById('username').value = '';
		document.getElementById('password').value = '';
	} catch (error) {
		alert(`❌ Error de login: ${error.response?.data?.error || error.message}`);
	}
}

// Función de salud
async function salud() {

	try {		
		const token = localStorage.getItem('token');
		if (!token) return alert('⚠️ Debes iniciar sesión primero.');

		const response = await axios.get(`${API_BASE}/api/health`,
			{
				headers: 
					{
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json'
					}
			}
		);
		alert('✅ API Saludable');

	} catch (error) {
		alert(`❌ API No Saludable: ${error.response?.data?.error || error.message}`);
	}
}

// Funcion de registro de contacto
async function registrarContacto() {
	const firstname = document.getElementById('nuevoNombre').value.trim();
	const lastname = document.getElementById('nuevoApellido').value.trim();
	const email = document.getElementById('nuevoEmail').value.trim();
	const phone = document.getElementById('nuevoTelefono').value.trim();
	const resultado = document.getElementById('resultado-registro');

	const token = localStorage.getItem('token');
	if (!token) return alert('⚠️ Debes iniciar sesión primero.');

	if (!firstname || !lastname || !email || !phone) {
		return alert('⚠️ Todos los campos son obligatorios.');
	}

	try {
		const response = await axios.post(`${API_BASE}/api/contacts`, {
			firstname,
			lastname,
			email,
			phone
		}, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		});

		resultado.textContent = `✅ Contacto registrado con ID: ${response.data.id}`;
		// Opcional: limpiar campos
		document.getElementById('nuevoNombre').value = '';
		document.getElementById('nuevoApellido').value = '';
		document.getElementById('nuevoEmail').value = '';
		document.getElementById('nuevoTelefono').value = '';

	} catch (error) {
		resultado.textContent = `❌ Error al registrar: ${error.response?.data?.error || error.message}`;
	}
}

// Funcion de busqueda por id
async function buscarPorId() {
	const id = document.getElementById('buscarId').value.trim();
	const token = localStorage.getItem('token');
	const resultado = document.getElementById('resultado-busqueda');

	if (!id) return alert('⚠️ Debes escribir un ID');
	if (!token) return alert('⚠️ Debes iniciar sesión primero.');

	try {
		const response = await axios.get(`${API_BASE}/api/contacts/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		const props = response.data.properties;

		resultado.innerHTML = `
			<strong>Id:</strong> ${id || ''}<br>
			<strong>Nombre:</strong> ${props.firstname || ''}<br>
			<strong>Apellido:</strong> ${props.lastname || ''}<br>
			<strong>Email:</strong> ${props.email || ''}<br>
			<strong>Teléfono:</strong> ${props.phone || ''}
		`;

		document.getElementById('buscarId').value = '';
	} catch (error) {
		resultado.textContent = `❌ No se encontró el contacto: ${error.response?.data?.error || error.message}`;
	}
}

// Funcion de busqueda por email
async function buscarPorEmail() {
	const email = document.getElementById('buscarEmail').value.trim();
	const token = localStorage.getItem('token');
	const resultado = document.getElementById('resultado-email');

	if (!email) return alert('⚠️ Debes escribir un correo');
	if (!token) return alert('⚠️ Debes iniciar sesión primero.');

	try {
		const response = await axios.get(`${API_BASE}/api/contacts/email/${encodeURIComponent(email)}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		const contactos = response.data.body;

		if (contactos.length === 0) {
			resultado.textContent = '❌ No se encontró ningún contacto con ese email.';
			return;
		}

		const contacto = contactos[0].properties;
		const id = contactos[0].id;

		resultado.innerHTML = `
			<strong>Id:</strong> ${id || ''}<br>
			<strong>Nombre:</strong> ${contacto.firstname || ''}<br>
			<strong>Apellido:</strong> ${contacto.lastname || ''}<br>
			<strong>Email:</strong> ${contacto.email || ''}<br>
			<strong>Teléfono:</strong> ${contacto.phone || ''}
		`;

		document.getElementById('buscarEmail').value = '';
	} catch (error) {
		resultado.textContent = `❌ No se encontró el contacto: ${error.response?.data?.error || error.message}`;
	}
}

// Funcion de cargar contactos
async function obtenerContactos() {
	const token = localStorage.getItem('token');
	const resultado = document.getElementById('lista-contactos');

	if (!token) {
		alert('⚠️ Debes iniciar sesión primero.');
		return;
	}

	try {
		const res = await axios.get(`${API_BASE}/api/contacts`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		resultado.innerHTML = '';
		const titulos = document.createElement('tr');
		titulos.innerHTML = `
			<td style="text-align: center; font-weight: bold">${"Id"}</td>
			<td style="text-align: center; font-weight: bold">${"Nombre"}</td>
			<td style="text-align: center; font-weight: bold">${"Apellido"}</td>
			<td style="text-align: center; font-weight: bold">${"Email"}</td>
			<td style="text-align: center; font-weight: bold">${"Teléfono"}</td>
		`;

		resultado.appendChild(titulos);

		const contactos = res.data.results;

		contactos.forEach(contacto => {
			const li = document.createElement('tr');
			li.innerHTML = `
				<td style="text-align: center">${contacto.id || ''}</td>
				<td style="text-align: center">${contacto.properties.firstname || ''}</td>
				<td style="text-align: center">${contacto.properties.lastname || ''}</td>
				<td style="text-align: center">${contacto.properties.email || ''}</td>
				<td style="text-align: center">${contacto.properties.phone || ''}</td>
			`;
			
			resultado.appendChild(li);
		});

	} catch (error) {
		alert(`❌ Error al obtener contactos: ${error.response?.data?.error || error.message}`);
	}
}

// Funcion de actualizar contacto
async function actualizarContacto() {
	const id = document.getElementById('updateId').value.trim();
	const firstname = document.getElementById('updateNombre').value.trim();
	const lastname = document.getElementById('updateApellido').value.trim();
	const email = document.getElementById('updateEmail').value.trim();
	const phone = document.getElementById('updateTelefono').value.trim();
	const resultado = document.getElementById('resultado-actualizacion');
	
	const token = localStorage.getItem('token');
	if (!token) return alert('⚠️ Debes iniciar sesión primero.');

	if (!id || !firstname || !lastname || !email || !phone) {
		return alert('⚠️ Todos los campos son obligatorios.');
	}

	try {
		const response = await axios.put(`${API_BASE}/api/contacts/${id}`, {
			firstname,
			lastname,
			email,
			phone
		}, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		});

		resultado.textContent = `✅ Contacto actualizado con ID: ${id}`;

		document.getElementById('updateId').value = '';
		document.getElementById('updateNombre').value = '';
		document.getElementById('updateApellido').value = '';
		document.getElementById('updateEmail').value = '';
		document.getElementById('updateTelefono').value = '';
	} catch (error) {
		resultado.textContent = `❌ Error al actualizar: ${error.response?.data?.error || error.message}`;
	}
}

// Funcion de eliminar contacto
async function eliminarContacto() {
	const id = document.getElementById('contactId').value.trim();
	const token = localStorage.getItem('token');
	const resultado = document.getElementById('resultado-eliminacion');

	if (!token) {
		alert('⚠️ Debes iniciar sesión primero.');
		return;
	}

	const confirmar = confirm('¿Estás seguro de eliminar este contacto?');
	if (!confirmar) return;

	try {
		await axios.delete(`${API_BASE}/api/contacts/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		resultado.textContent = `✅ Contacto eliminado con éxito, con id: ${id}`;
		document.getElementById('contactId').value = '';
	} catch (error) {
		resultado.textContent = `❌ Error al eliminar: ${error.response?.data?.error || error.message}`;
	}
}

// Botones evitando CSP
// Login
document.getElementById("botonLogin").addEventListener("click", function() {
    login();
});

// Salud
document.getElementById("botonSalud").addEventListener("click", function() {
    salud();
});

// Registro de contacto
document.getElementById("botonRegistro").addEventListener("click", function() {
    registrarContacto();
});

// Buscar contacto por Id
document.getElementById("botonBuscarId").addEventListener("click", function() {
    buscarPorId();
});

// Buscar contacto por Email
document.getElementById("botonBuscarEmail").addEventListener("click", function() {
    buscarPorEmail();
});

// Cargar contactos
document.getElementById("botonCargarContactos").addEventListener("click", function() {
  	obtenerContactos();
});

// Actualizar contacto
document.getElementById("botonActualizarContacto").addEventListener("click", function() {
  	actualizarContacto();
});

// Eliminar contacto
document.getElementById("botonEliminarContacto").addEventListener("click", function() {
  	eliminarContacto();
});






