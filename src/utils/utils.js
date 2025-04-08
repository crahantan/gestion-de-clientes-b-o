// Función de utilidad para procesar variables de entorno
export const procesarEnv = (envV, valorDefault = []) => {
  if (!process.env[envV]) return valorDefault;
  return process.env[envV]
    .split(',')
    .map(item => item.trim())
    .filter(item => item.length > 0);
};

// Opciones de CORS
export const opcionesCors = (DOMINIOS_PERMITIDOS,METODOS_PERMITIDOS,HEADERS_PERMITIDOS) => {
	return {
  origin: (origin, callback) => {
    if (DOMINIOS_PERMITIDOS.includes(origin) || !origin) { 
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: METODOS_PERMITIDOS,
	allowedHeaders: HEADERS_PERMITIDOS
	}
};
