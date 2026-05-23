
# ADR-004: Implementación de Seguridad con JWT y Bcrypt

## Estado

Aceptado

## Contexto

El sistema Green Mantenimientos & Servicios Ambientales necesita proteger rutas privadas y autenticar usuarios de forma segura.

El sistema maneja información de usuarios, roles, clientes y mantenimientos, por lo que se requiere una táctica de seguridad basada en autenticación y autorización.

## Problema

Sin autenticación, cualquier persona podría acceder a rutas internas del sistema.

Además, las contraseñas no deben almacenarse en texto plano porque representa un riesgo de seguridad.

## Decisión

Se decide implementar seguridad usando JSON Web Tokens y bcrypt.

La solución incluye:

- `AuthController.js` para manejar el login.
- `bcrypt` para validar contraseñas mediante hash.
- `accessToken` con vida corta de 15 minutos.
- `refreshToken` con vida larga de 7 días.
- `authMiddleware.js` para validar el header `Authorization`.
- Protección de rutas privadas usando Bearer Token.

## Consecuencias positivas

- Mejora la seguridad del sistema.
- Las rutas protegidas rechazan usuarios sin token.
- La autenticación es stateless.
- La lógica de seguridad queda separada en un middleware.
- Se facilita la escalabilidad del sistema.

## Consecuencias negativas

- Si un token es robado, puede usarse hasta que expire.
- En producción se deben proteger las claves `JWT_SECRET` y `REFRESH_SECRET`.
- Para cerrar sesión completamente se necesitaría una lista negra de tokens.

## Pruebas en Postman

### Login

- Método: POST
- URL: `http://localhost:3000/api/users/login`

Body:

```json
{
  "email": "admin@green.com",
  "password": "admin123"
}