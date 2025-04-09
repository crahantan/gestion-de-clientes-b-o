// Función de utilidad para procesar variables de entorno
export const procesarEnv = (envV, valorDefault = []) => {
  if (!process.env[envV]) return valorDefault;
  return process.env[envV]
    .split(',')
    .map(item => item.trim())
    .filter(item => item.length > 0);
};


