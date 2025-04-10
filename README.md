# 📬 HubSpot Contacts API (JWT + Node.js + Express)

Este proyecto implementa una API RESTful para gestionar contactos a través de la API de HubSpot.  
Incluye autenticación con JSON Web Tokens (JWT), validación y sanitización de datos, y pruebas automatizadas con Jest + Supertest.

---

## 🚀 Características principales

- CRUD completo de contactos (`GET`, `POST`, `PUT`, `DELETE`)
- Login con JWT (`/auth/login`)
- Middleware de autenticación personalizado con `jsonwebtoken`
- Validación de inputs con `express-validator`
- Peticiones HTTP a HubSpot usando `axios`
- Test unitarios con `jest` y `supertest`
- Cliente HTML para interactuar con la API desde el navegador (opcional)

---

## 🧰 Tecnologías utilizadas

- Node.js
- Express.js
- JWT (`jsonwebtoken`)
- Axios
- Express Validator
- Jest + Supertest (para testing)
- Dotenv
- Helmet + CORS (seguridad)

---

## ⚙️ Requisitos previos

- Node.js v18 o superior
- Cuenta en HubSpot con una API Key o acceso vía token privado

---

## 📦 Instalación

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
npm install
```

📄 Archivo .env
Crea un archivo .env en la raíz del proyecto con el siguiente contenido:
```env
PORT=3000
HUBSPOT_API_KEY=tu_token_de_hubspot
HUBSPOT_API_BASE=https://api.hubapi.com
DOMINIO=localhost
JWT_SECRET=supersecretoseguro
```

