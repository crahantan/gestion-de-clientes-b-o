import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construimos usuario de prueba hardcodeado utilizando templates
const user = JSON.parse(
  await readFile(path.join(__dirname, '../templates/user.json'), 'utf8')
);

// Router autentificación
const router = Router();

// Endpoint login
router.post('/login', (req,res) => {
	const { username, password } = req.body;

	if( username === user.username && password === user.password) {
		const token = jwt.sign(
			{ id: user.id, username: user.username },
			process.env.JWT_SECRET,
			{ expiresIn: '1h' }
		);
		return res.json({ token });
	}


	return res.status(401).json({ error: 'Credenciales inválidas' });
});

export default router;
