import request from 'supertest';
import helmet from 'helmet';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import contacts from '../src/routes/contacts.js'
import auth from '../src/routes/auth.js';
import user from '../src/templates/user.json' with { type: 'json' };


dotenv.config();

// Incializamos app de prueba
const app = express();
app.use(express.json());

// Helmet
app.use(helmet());

// Cors
app.use(cors());

// Llamamos a los routers
app.use('/auth',auth);
app.use('/api',contacts);

// Función describe de test
describe('🧪 Tests de Ruta Contactos', () => {

  let idTest = null;
	let token = null;
  const emailUnico = `test_${Date.now()}@mail.com`;

	// Login
	test('POST /auth/login → debe devolver un JWT (200)', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send(user);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');

    token = response.body.token; // lo usamos para las siguientes pruebas
  });

	// Crear contacto
  test('POST /api/contacts → debe crear un nuevo contacto (201)', async () => {

    const response = await request(app)
      .post('/api/contacts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstname: 'Luis_Alvarez',
        lastname: 'test',
        email: emailUnico,
        phone: '5512345678',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    idTest = response.body.id;
  });

	// Obtener todos los contactos
  test('GET /api/contacts → debe retornar un listado de contactos (200)', async () => {
    const response = await request(app)
      .get('/api/contacts')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.results)).toBe(true);
  });

	// Obtener un contacto por id
  test('GET /api/contacts/:id → debe retornar un contacto específico buscado por id (200)', async () => {
    if (!idTest) return;

    const response = await request(app)
      .get(`/api/contacts/${idTest}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', idTest);
  });

	// Obtener un contacto por email
	test('GET /api/contacts/email/:email → debe retornar un contacto específico buscado por email ', async () => {
    const response = await request(app)
      .get(`/api/contacts/email/${encodeURIComponent(emailUnico)}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.body)).toBe(true);
  });

	// Actualizar un contacto 
  test('PUT /api/contacts/:id → debe actualizar el contacto (200)', async () => {
    if (!idTest) return;

    const response = await request(app)
      .put(`/api/contacts/${idTest}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstname: 'Luis_Alvarez_test',
        lastname: 'Actualizado',
        email: `luis_actualizado_${Date.now()}@mail.com`,
        phone: '5567891234',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.body).toHaveProperty('properties');
  });

	// Eliminar contacto
  test('DELETE /api/contacts/:id → debe eliminar el contacto (204)', async () => {
    if (!idTest) return;

    const response = await request(app)
      .delete(`/api/contacts/${idTest}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(204);
  });
});


