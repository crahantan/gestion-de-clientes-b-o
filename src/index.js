import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import contacts from './routes/contacts.js';
import { procesarEnv,opcionesCors } from './utils/utils.js';

// Obtenemos configuración por default de ENV
dotenv.config();

// ENV
const PORT = parseInt(procesarEnv('PORT',3000));
const DOMINIOS_PERMITIDOS = procesarEnv('DOMINIOS_PERMITIDOS');
const METODOS_PERMITIDOS = procesarEnv('METODOS_PERMITIDOS', ['GET', 'POST', 'OPTIONS']);
const HEADERS_PERMITIDOS = procesarEnv('ALLOWED_HEADERS', ['Content-Type', 'Authorization']);

// Inicializamos app de express
const app = express();
app.use(express.json());

// Helmet
app.use(helmet());

// Cors
const optCors= opcionesCors(DOMINIOS_PERMITIDOS,METODOS_PERMITIDOS,HEADERS_PERMITIDOS);
app.use(cors(optCors));

// Ruta contactos
app.use('/api',contacts);

// Verificación de salud 
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API Saludable',
    timestamp: new Date().toISOString()
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);

	// Error de API desde Backend 
	if(err == 500){
  	res.status(500).json({ error: 'Error interno del servidor' });

	// Recurso no encontrado
	}else if(err == 400){
  	res.status(404).json({
    	error: 'Recurso no encontrado',
    	path: req.originalUrl
  	});
	}
});

// Escuchamos en puerto
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
