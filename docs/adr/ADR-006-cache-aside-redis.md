# ADR-006: Implementación de Cache-Aside con Redis

## Estado

Aceptado

## Contexto

Durante las pruebas de estrés del sistema Green Mantenimientos & Servicios Ambientales, se identificó que ciertos endpoints pueden recibir muchas peticiones concurrentes.

Algunos endpoints, como reportes o resúmenes de mantenimientos, pueden generar carga innecesaria sobre la base de datos si se consultan repetidamente con la misma información.

## Problema

Si muchos usuarios consultan al mismo tiempo información pesada o repetitiva, la base de datos puede convertirse en un cuello de botella.

Esto afecta atributos de calidad como rendimiento, disponibilidad y escalabilidad.

## Decisión

Se decide implementar el patrón Cache-Aside usando Redis.

El flujo será:

1. La aplicación recibe una petición.
2. Primero consulta Redis.
3. Si el dato existe en caché, lo retorna inmediatamente.
4. Si no existe, consulta la base de datos.
5. Guarda el resultado en Redis con un TTL.
6. Retorna la respuesta al cliente.

## Consecuencias positivas

- Reduce la carga sobre la base de datos.
- Mejora el tiempo de respuesta.
- Aumenta la capacidad del sistema bajo carga.
- Permite soportar más usuarios concurrentes.

## Consecuencias negativas

- Puede existir información temporalmente desactualizada.
- Se debe definir correctamente el TTL.
- Redis se convierte en una dependencia adicional.
- Hay que manejar fallos de caché sin afectar la aplicación.

## Endpoint implementado

Se implementó caché en:

```text
GET /api/reportes/resumen