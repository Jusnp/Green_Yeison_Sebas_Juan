# PRUEBAS POSTMAN — LABORATORIO 7 JWT

## Verificación inicial del usuario administrador

Antes de iniciar las pruebas en Postman, verifica que en el archivo:

```txt
src/controllers/AuthController.js

exista un usuario administrador similar a este:

const userInDB = {
  id: 101,
  nombre: "Yeison Areiza",
  email: "admin@green.com",
  passwordHash: passwordHashSimulado,
  rol: "admin"
};

Las credenciales del administrador para las pruebas son:

{
  "email": "admin@green.com",
  "password": "admin123"
}
1. Levantar el servidor

En Visual Studio Code abre la terminal y ejecuta:

node src/server.js

Resultado esperado:

Servidor corriendo en http://localhost:3000

La terminal debe permanecer abierta mientras realizas las pruebas.

También puedes abrir en el navegador:

http://localhost:3000/

Si aparece:

API funcionando 🚀

el servidor está funcionando correctamente.

2. PRUEBA POSTMAN — LOGIN DEL ADMINISTRADOR
Objetivo

Generar un token JWT válido mediante autenticación exitosa.

Configuración de la petición
Método
POST
URL
http://localhost:3000/api/users/login
Body

Ir a:

Body → raw → JSON

Pegar:

{
  "email": "admin@green.com",
  "password": "admin123"
}
Resultado esperado

Debe responder:

Status: 200 OK

Respuesta esperada:

{
  "message": "Autenticación exitosa",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
Importante

El token se devuelve en la propiedad:

token

Debes copiar completamente el valor largo que comienza por:

eyJhbGciOiJIUzI1NiIs...

Esta captura corresponde a la primera evidencia requerida.

3. PRUEBA POSTMAN — RUTA PROTEGIDA SIN TOKEN
Objetivo

Comprobar que el sistema bloquea el acceso cuando no se envía token JWT.

Configuración de la petición
Método
GET
URL
http://localhost:3000/api/users/mantenimientos/historial
Authorization

Ir a:

Authorization

Seleccionar:

No Auth
Body

No se debe enviar Body.

Resultado esperado

Debe responder:

Status: 401 Unauthorized

Respuesta esperada:

{
  "success": false,
  "message": "Acceso denegado. Token de autenticación no proporcionado en los headers."
}

Esta captura corresponde a la segunda evidencia requerida.

4. PRUEBA POSTMAN — RUTA PROTEGIDA CON TOKEN VÁLIDO
Objetivo

Comprobar que el administrador autenticado puede acceder correctamente usando el token JWT.

Configuración de la petición
Método
GET
URL
http://localhost:3000/api/users/mantenimientos/historial
Authorization

Ir a:

Authorization

Seleccionar:

Bearer Token

En el campo Token pegar únicamente el token generado en el login.

Correcto
eyJhbGciOiJIUzI1NiIs...
Incorrecto
Bearer eyJhbGciOiJIUzI1NiIs...
Resultado esperado

Debe responder:

Status: 200 OK

Respuesta esperada:

{
  "success": true,
  "message": "Acceso concedido.",
  "datos": "Historial protegido procesado para el usuario con ID: 101 y Rol: admin"
}

Esta captura corresponde a la tercera evidencia requerida.

5. PRUEBA POSTMAN — TOKEN INVÁLIDO
Objetivo

Comprobar que el sistema detecta tokens inválidos y bloquea el acceso.

Configuración de la petición
Método
GET
URL
http://localhost:3000/api/users/mantenimientos/historial
Authorization

Seleccionar:

Bearer Token

En el campo Token ingresar un valor falso, por ejemplo:

token_falso_123
Resultado esperado

Debe responder:

Status: 403 Forbidden

Respuesta esperada:

{
  "success": false,
  "message": "Token inválido, alterado o expirado. Acceso denegado."
}

Esta captura también sirve como evidencia de seguridad del sistema.


