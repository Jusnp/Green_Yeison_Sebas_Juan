# ADR-004: Implementación de Seguridad con JWT y Hashing con Bcrypt

## Estado
Aceptado

## Contexto
El sistema de **Green Mantenimientos & Servicios Ambientales** maneja datos críticos de clientes, agendas de mantenimiento y reportes de impacto ecológico. La arquitectura base inicial carecía de un mecanismo seguro de autenticación, lo que exponía al sistema a accesos no autorizados y al almacenamiento inseguro de credenciales en la base de datos. 

Para solucionar esto, se requiere una táctica de seguridad que cumpla con los siguientes requisitos:
1. **Confidencialidad:** Las contraseñas no deben ser legibles bajo ninguna circunstancia (ni por administradores de la base de datos).
2. **Escalabilidad y Rendimiento:** El mecanismo de autenticación debe ser *stateless* (sin estado) para evitar sobrecargar el servidor con sesiones en memoria y facilitar la transición hacia microservicios en el futuro.
3. **Control de Acceso:** Restringir rutas del sistema según el rol del usuario (`admin`, `tecnico`, `cliente`).

## Decisión
Se ha decidido implementar una arquitectura de seguridad basada en tokens y criptografía de hash mediante las siguientes acciones técnicas:

1. **Hashing con Bcrypt:** Utilizar la librería `bcrypt` para aplicar un algoritmo de derivación de claves con un **factor de costo (sal) de 10**. Esto protege las contraseñas contra ataques de diccionario y tablas de arcoíris.
2. **Autenticación con JSON Web Tokens (JWT):** Adoptar JWT para el manejo de sesiones de usuario de forma *stateless*. Al iniciar sesión con éxito, el sistema emitirá dos tokens:
   * **Access Token:** Con un tiempo de expiración corto (15 minutos) para autorizar las peticiones HTTP ordinarias.
   * **Refresh Token:** Con un tiempo de expiración largo (7 días) para renovar el Access Token de forma transparente sin obligar al usuario a loguearse constantemente.
3. **Middleware Centralizado:** Implementar el componente `authMiddleware.js` encargado de interceptar las peticiones a rutas protegidas, extraer el token del header `Authorization` (formato `Bearer`), verificar su firma y vigencia, e inyectar el payload del usuario en la petición (`req.user`).

## Consecuencias

### Atributos de Calidad Impactados:

* **Seguridad (✔ Alto Impacto Positivo):** Las contraseñas se almacenan de forma segura. Si la base de datos se ve comprometida, los hashes de Bcrypt mitigan la ingeniería inversa. Las rutas críticas quedan blindadas contra peticiones anónimas.
* **Escalabilidad y Rendimiento (✔ Impacto Positivo):** Al usar JWT, el servidor no necesita consultar la base de datos ni una tabla de sesiones en memoria para validar la identidad en cada petición HTTP, reduciendo la latencia general.
* **Mantenibilidad (✔ Impacto Positivo):** La lógica de validación de seguridad queda aislada en un middleware independiente de los controladores de negocio, respetando el principio de separación de responsabilidades.

### Compensaciones (Trade-offs / Aspectos Negativos):
* **Complejidad en la Invalidación (❌):** Debido a la naturaleza *stateless* de JWT, un token emitido es válido hasta que expire. Si un usuario cierra sesión o es bloqueado, el token sigue siendo técnicamente utilizable a menos que se implemente una lista negra (Blacklist) en caché (ej. con Redis), lo cual añade complejidad.
* **Gestión de Secretos:** La seguridad del sistema depende enteramente de mantener la clave `JWT_SECRET` oculta a través de variables de entorno del sistema.

