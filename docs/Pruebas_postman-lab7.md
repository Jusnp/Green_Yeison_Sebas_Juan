Listo. Estas son todas las pruebas de Postman desde cero, incluyendo el admin que estás usando. Tu documento pide probar login, acceso denegado y acceso concedido con token. 
0. Verifica que el admin exista en AuthController.js
En tu archivo:
src/controllers/AuthController.js
Debe existir un usuario admin parecido a este:
const userInDB = {
  id: 101,
  nombre: "Yeison Areiza",
  email: "admin@green.com",
  passwordHash: passwordHashSimulado,
  rol: "admin"
};
Ese admin se prueba con estas credenciales:
{
  "email": "admin@green.com",
  "password": "admin123"
}
________________________________________
1. Levantar el servidor
En VS Code abre la terminal y ejecuta:
node src/server.js
Debe salir:
Servidor corriendo en http://localhost:3000
Deja esa terminal abierta.
También puedes abrir en navegador:
http://localhost:3000/
Si sale:
API funcionando 🚀
vas bien.
________________________________________
2. Prueba POSTMAN 1: Login del admin
Esta prueba genera el token.
En Postman crea una petición nueva:
Método
POST
URL
http://localhost:3000/api/users/login
Body
Ve a:
Body → raw → JSON
Pega esto:
{
  "email": "admin@green.com",
  "password": "admin123"
}
Resultado esperado
Debe salir:
Status: 200 OK
Y una respuesta parecida a esta:
{
  "message": "Autenticación exitosa",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
En tu caso el token se llama:
token
Copia todo el valor largo que empieza por:
eyJhbGciOiJIUzI1NiIs...
Esa captura es la primera prueba.
________________________________________
3. Prueba POSTMAN 2: Ruta protegida sin token
Esta prueba demuestra que el sistema bloquea acceso si no mandas token.
Crea otra petición o cambia la misma.
Método
GET
URL
http://localhost:3000/api/users/mantenimientos/historial
Ojo: en la URL no escribas la palabra GET. Solo va la dirección.
Authorization
Ve a:
Authorization
En Type selecciona:
No Auth
Body
No pongas nada en Body.
Resultado esperado
Debe salir:
Status: 401 Unauthorized
Y una respuesta como:
{
  "success": false,
  "message": "Acceso denegado. Token de autenticación no proporcionado en los headers."
}
Esa captura es la segunda prueba.
________________________________________
4. Prueba POSTMAN 3: Ruta protegida con token válido
Esta prueba demuestra que el admin sí puede entrar usando el token.
Usa la misma ruta protegida:
Método
GET
URL
http://localhost:3000/api/users/mantenimientos/historial
Authorization
Ve a:
Authorization
En Type selecciona:
Bearer Token
En el campo Token, pega el token largo que copiaste del login.
Importante: pega solo el token, no escribas Bearer.
Correcto:
eyJhbGciOiJIUzI1NiIs...
Incorrecto:
Bearer eyJhbGciOiJIUzI1NiIs...
Resultado esperado
Debe salir:
Status: 200 OK
Y una respuesta parecida a esta:
{
  "success": true,
  "message": "Acceso concedido.",
  "datos": "Historial protegido procesado para el usuario con ID: 101 y Rol: admin"
}
Esa captura es la tercera prueba.
________________________________________
5. Prueba POSTMAN 4: Token inválido
Esta prueba demuestra el error 403.
Usa la misma ruta:
Método
GET
URL
http://localhost:3000/api/users/mantenimientos/historial
Authorization
Selecciona:
Bearer Token
Pero en el campo Token pega algo falso, por ejemplo:
token_falso_123
Resultado esperado
Debe salir:
Status: 403 Forbidden
Y algo parecido a:
{
  "success": false,
  "message": "Token inválido, alterado o expirado. Acceso denegado."
}
Esta captura también sirve como evidencia de seguridad.
________________________________________
Resumen de capturas que debes entregar
Toma capturas de estas 4 pruebas:
Prueba	Método	URL	Resultado
Login admin	POST	/api/users/login	200 OK
Sin token	GET	/api/users/mantenimientos/historial	401 Unauthorized
Con token válido	GET	/api/users/mantenimientos/historial	200 OK
Token falso	GET	/api/users/mantenimientos/historial	403 Forbidden
Cuando termines las pruebas, si cambiaste archivos como server.js, AuthController.js o authMiddleware.js, haz otro commit y push.


