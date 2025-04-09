import { Router } from 'express';
import {jwt} from 'jsonwebtoken';
import user from '../templates/user.json' with { type: 'json' };

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
