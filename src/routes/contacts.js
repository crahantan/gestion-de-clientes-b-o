import { Router } from 'express';
import {
  createContact,
  getAllContacts,
  getContactById,
  getContactByEmail,
  updateContact,
  deleteContact
} from '../controllers/contactControllers.js';
import { validateContact } from '../middlewares/validateInput.js';
import { autentificacion } from '../middlewares/authMiddleware.js';

// Inicializamos Router
const router = Router();

// Protección de endpoints con JWT
router.use(autentificacion);

// CRUD de contactos
router.post('/contacts', validateContact, createContact);
router.get('/contacts', getAllContacts);
router.get('/contacts/:id', getContactById);
router.get('/contacts/email/:email', getContactByEmail);
router.put('/contacts/:id', validateContact, updateContact);
router.delete('/contacts/:id', deleteContact);

export default router;
