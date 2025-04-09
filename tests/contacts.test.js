import { HUBSPOT_API_KEY }  from '../src/config/hubspot.js';  
import request from 'supertest';
import helmet from 'helmet';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import contacts from '../src/routes/contacts.js'
import auth from '../src/routes/auth.js';
import { opcionesCors } from '../src/config/cors.js';
import { procesarEnv } from '../src/utils/utils.js';


dotenv.config();


const apiKey = HUBSPOT_API_KEY;

// Dominios, métodos y headers
const DOMINIOS_PERMITIDOS = procesarEnv('DOMINIOS_PERMITIDOS');
const METODOS_PERMITIDOS = procesarEnv('METODOS_PERMITIDOS', ['GET', 'POST', 'OPTIONS']);
const HEADERS_PERMITIDOS = procesarEnv('ALLOWED_HEADERS', ['Content-Type', 'Authorization']);


// Incializamos app de prueba
const app = express();
app.use(express.json());

// Helmet
app.use(helmet());

// Cors
const optCors= opcionesCors(DOMINIOS_PERMITIDOS,METODOS_PERMITIDOS,HEADERS_PERMITIDOS);
app.use(cors(optCors));

// Llamamos a los routers
app.use('/auth',auth);
app.use('/api',contacts);

// Función describe de test
describe('🧪 Tests de Ruta Contactos', () => {

  let idTest = null;

  test('POST /api/contacts → debe crear un nuevo contacto (201)', async () => {
    const emailUnico = `test_${Date.now()}@mail.com`;

    const response = await request(app)
      .post('/api/contacts')
      .set('Authorization', `Bearer ${apiKey}`)
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

  test('GET /api/contacts → debe retornar un listado de contactos (200)', async () => {
    const response = await request(app)
      .get('/api/contacts')
      .set('Authorization', `Bearer ${apiKey}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.results)).toBe(true);
  });

  test('GET /api/contacts/:id → debe retornar un contacto específico (200)', async () => {
    if (!idTest) return;

    const response = await request(app)
      .get(`/api/contacts/${idTest}`)
      .set('Authorization', `Bearer ${apiKey}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', idTest);
  });

  test('PUT /api/contacts/:id → debe actualizar el contacto (200)', async () => {
    if (!idTest) return;

    const response = await request(app)
      .put(`/api/contacts/${idTest}`)
      .set('Authorization', `Bearer ${apiKey}`)
      .send({
        firstname: 'Luis_Alvarez_test',
        lastname: 'Actualizado',
        email: `luis_actualizado_${Date.now()}@mail.com`,
        phone: '5567891234',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.body).toHaveProperty('properties');
  });

  test('DELETE /api/contacts/:id → debe eliminar el contacto (204)', async () => {
    if (!idTest) return;

    const response = await request(app)
      .delete(`/api/contacts/${idTest}`)
      .set('Authorization', `Bearer ${apiKey}`);

    expect(response.statusCode).toBe(204);
  });
});


