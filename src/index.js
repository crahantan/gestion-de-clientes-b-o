import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import contacts from './routes/contacts.js';
import auth from './routes/auth.js';
import { procesarEnv } from './utils/utils.js';
import path from 'path';
import { fileURLToPath } from 'url';


// Obtenemos configuración por default de ENV
dotenv.config();

// ENV
const PORT = parseInt(procesarEnv('PORT',3000));

// Inicializamos app de express
const app = express();
app.use(express.json());

// Helmet
app.use(helmet());

// Cors
app.use(cors());

// Crear el equivalente de __dirname para ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuramos archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta autorización 
app.use('/auth',auth);

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
