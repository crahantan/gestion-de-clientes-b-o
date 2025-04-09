import { randomBytes } from 'node:crypto';

// Seguridad deseada de secreto
// mínimo recomendado 32 bytes (252 bits)
const longitudSecreto = 32;

// Creamos buffer de bytes aleatorios
const buffer = randomBytes(longitudSecreto);

// Convertimos bytes a hexadecimal
const jwtSecret = buffer.toString('hex');

// Mostramos por consola
console.log('Tu JWT Generado es: ',jwtSecret);
