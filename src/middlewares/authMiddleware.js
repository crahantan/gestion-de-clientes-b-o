import jwt from 'jsonwebtoken';

// Función de autenficación 
export const autentificacion = (req, res, next) => {
	const autHeader = req.headers.authorization;

	if(!autHeader) {
		return res.status(401).json({ error: 'Token no proporcionado' });
	}

	const token = autHeader.split(' ')[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch(error) {
		return res.status(403).json({ error: 'Token inválido o expirado' });
	}
}
