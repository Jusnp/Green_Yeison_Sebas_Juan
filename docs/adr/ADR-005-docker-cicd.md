# ADR-005: Docker y Pipeline CI/CD

## Estado

Aceptado

## Contexto

El sistema Green Mantenimientos & Servicios Ambientales necesita ejecutarse de forma reproducible en diferentes entornos.

Para evitar problemas de configuración local, se decide contenerizar la aplicación y automatizar validaciones usando CI/CD.

## Problema

Cada integrante puede tener versiones diferentes de Node.js, dependencias o configuración local.

Esto puede causar errores al ejecutar la aplicación en diferentes computadores.

Además, el proyecto necesita validar automáticamente que el código funcione antes de integrarse a ramas principales.

## Decisión

Se decide implementar infraestructura como código usando Docker, docker-compose y GitHub Actions.

La solución incluye:

- `Dockerfile` multi-stage.
- Usuario no-root en producción.
- `docker-compose.yml` con App, PostgreSQL y Redis.
- Pipeline CI/CD con GitHub Actions.
- Validación automática de instalación, pruebas y construcción Docker.
- Despliegue simulado a Render o Railway.

## Consecuencias positivas

- El entorno es reproducible.
- Se reduce el problema de “funciona en mi máquina”.
- La aplicación puede levantarse con un solo comando.
- El pipeline detecta errores antes del merge.
- La arquitectura queda materializada como infraestructura.

## Consecuencias negativas

- Docker agrega complejidad inicial.
- Se deben mantener actualizadas las imágenes base.
- En producción los secretos deben manejarse con variables seguras.
- El despliegue real requiere configurar credenciales externas.

## Comandos principales

Construir imagen:

```bash
docker build -t green-mantenimientos-api .
