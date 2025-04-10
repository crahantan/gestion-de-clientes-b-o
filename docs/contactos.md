# Documentación de la API de Contactos
## Endpoints para gestionar contactos de clientes.

### 1. Obtener todos los contactos
- Método: GET
- URL: /api/contactos
- Respuesta Exitosa (200 OK):

```json
{
    "id": "56810244744",
    "properties": {
        "createdate": "2024-09-10T20:00:56.984Z",
        "email": "test_front_montado@gmail.com",
        "firstname": "Luis",
        "hs_object_id": "56810244744",
        "lastmodifieddate": "2025-04-10T04:55:11.122Z",
        "lastname": "Alvarez",
        "phone": "1234567890"
    },
    "createdAt": "2024-09-10T20:00:56.984Z",
    "updatedAt": "2025-04-10T04:55:11.122Z",
    "archived": false
},
...
```

--- 

### 2. Crear un nuevo contacto
- Método: POST
- URL: /api/contactos
- Cuerpo de la Solicitud (Ejemplo):
```json
{
  "firstname": "Ana",
  "lastname": "Lopez",
  "email": "ana@empresa.com",
  "phone": "555-5678",
}
```
- Campos Obligatorios: nombre, telefono, email, empresa
- Respuesta Exitosa (201)
- Error (400) Bad Request: Si faltan campos obligatorios o el email no es válido.

---

### 3. Obtener un contacto por ID
- Método: GET
- URL: /api/contactos/{id}

Parámetros de URL:
- id (requerido): ID del contacto

- Respuesta Exitosa (200 OK):
```json
{
    "id": "56810244744",
    "properties": {
        "createdate": "2024-09-10T20:00:56.984Z",
        "email": "test_front_montado@gmail.com",
        "firstname": "Luis",
        "hs_object_id": "56810244744",
        "lastmodifieddate": "2025-04-10T04:55:11.122Z",
        "lastname": "Alvarez",
        "phone": "1234567890"
    },
    "createdAt": "2024-09-10T20:00:56.984Z",
    "updatedAt": "2025-04-10T04:55:11.122Z",
    "archived": false
}
```
- Error (404) Not Found: Si el contacto no existe.

---

### 4. Actualizar un contacto
- Método: PUT
- URL: /api/contactos/{id}

Parámetros de URL:
- id (requerido): ID del contacto
- Cuerpo de la Solicitud (Ejemplo):
```json
```


- Respuesta Exitosa (200 OK):
```json
{
    "mensaje:": "Actualización de contacto exitosa!",
    "body": {
        "id": "112439745425",
        "properties": {
            "createdate": "2025-04-08T17:49:25.375Z",
            "email": "joseluisa@gmail.com",
            "firstname": "Jose",
            "hs_full_name_or_email": "Jose Alvarez",
            "hs_is_unworked": "true",
            "hs_object_id": "112439745425",
            "hs_object_source": "INTEGRATION",
            "hs_object_source_id": "4071176",
            "hs_object_source_label": "INTEGRATION",
            "hs_pipeline": "contacts-lifecycle-pipeline",
            "lastmodifieddate": "2025-04-09T01:18:40.421Z",
            "lastname": "Alvarez",
            "lifecyclestage": "lead",
            "phone": "1234568797"
        },
        "createdAt": "2025-04-08T17:49:25.375Z",
        "updatedAt": "2025-04-09T01:18:40.421Z",
        "archived": false
    }
}
```
- Error (404) Not Found: Si el contacto no existe.
- Error (400) Bad Request: Si hay campos inválidos.

---

### 5. Eliminar un contacto
- Método: DELETE
- URL: /api/contactos/{id}

Parámetros de URL:
- id (requerido): ID del contacto

- Respuesta Exitosa (204 No Content):
(Sin cuerpo de respuesta)

- Errores (404) Not Found: Si el contacto no existe.

