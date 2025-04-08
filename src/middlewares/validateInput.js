import { check, validationResult } from 'express-validator';

export const validateContact = [
  check('firstname')
    .trim().escape()
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),

  check('lastname')
    .trim().escape()
    .notEmpty().withMessage('El apellido es obligatorio')
    .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),

  check('email')
    .trim().normalizeEmail()
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido'),

  check('phone')
    .trim()
    .notEmpty().withMessage('El número de teléfono es obligatorio')
    .isMobilePhone().withMessage('Debe ser un número de teléfono válido'),

  // Middleware para manejo de errores
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const mensajes = errors.array().map(err => err.msg);
      return res.status(400).json({ errores: mensajes });
    }
    next();
  }
];


