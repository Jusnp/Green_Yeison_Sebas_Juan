# ADR-001: Aplicación de principios SOLID en el módulo de usuarios

## Estado

Aceptado

## Fecha

2026-05-22

## Contexto

El sistema de Green Mantenimientos & Servicios Ambientales necesita gestionar usuarios, roles, autenticación, validaciones, persistencia de datos y notificaciones. En una primera versión del diseño, estas responsabilidades podían quedar concentradas en una sola clase tipo `UserManager`, lo cual genera un problema arquitectónico porque una misma clase termina encargándose de varias tareas al mismo tiempo.

Este enfoque monolítico afecta directamente la mantenibilidad del sistema, ya que cualquier cambio en las reglas de validación, en la forma de guardar usuarios o en el envío de correos obligaría a modificar la misma clase. Esto aumenta el riesgo de errores, dificulta las pruebas y hace que el código sea más difícil de entender para el equipo.

El Laboratorio 6 de la Semana 7 solicita refactorizar este tipo de código aplicando principios SOLID, especialmente el principio de responsabilidad única, conocido como SRP, y el principio de inversión de dependencias, conocido como DIP. El objetivo es lograr alta cohesión y bajo acoplamiento dentro del sistema.

Además, el proyecto Green tiene como uno de sus atributos importantes la mantenibilidad, debido a que el sistema contiene varios módulos relacionados como usuarios, clientes, servicios, pagos, reportes, inventario y notificaciones. Por esta razón, el código debe organizarse de forma clara, modular y fácil de modificar.

## Problema

El problema principal es que una clase monolítica encargada de gestionar usuarios puede mezclar varias responsabilidades, por ejemplo:

- Validar los datos del usuario.
- Guardar usuarios en la base de datos.
- Buscar usuarios por correo electrónico.
- Enviar correos de bienvenida o notificaciones.
- Coordinar la lógica del registro de usuarios.

Cuando estas responsabilidades se mezclan, se violan principios importantes de diseño de software:

1. Se viola SRP porque la clase tiene más de una razón para cambiar.
2. Se aumenta el acoplamiento porque la lógica de negocio depende directamente de detalles técnicos como la base de datos o el servicio de correo.
3. Se dificulta el mantenimiento porque un cambio pequeño puede afectar varias partes del sistema.
4. Se complica la realización de pruebas unitarias porque no es fácil reemplazar dependencias reales por simuladas.
5. Se reduce la claridad del código porque no existe una separación limpia entre validación, persistencia y notificaciones.

## Decisión

Se decidió refactorizar el módulo de usuarios separando las responsabilidades en clases independientes, aplicando los principios SOLID, especialmente SRP y DIP.

La decisión consiste en dividir la lógica relacionada con usuarios en los siguientes componentes:

### 1. UserValidator.js

Se crea el archivo:

`src/services/UserValidator.js`

Este componente se encarga únicamente de validar los datos del usuario durante el registro.

Responsabilidades principales:

- Validar que el nombre sea obligatorio y tenga mínimo 3 caracteres.
- Validar que el correo electrónico tenga un formato correcto.
- Validar que la contraseña tenga mínimo 8 caracteres.
- Validar que el rol pertenezca a los roles permitidos: `admin`, `tecnico` o `cliente`.
- Retornar un resultado con `isValid` y una lista de errores.

Este componente aplica el principio SRP porque solo tiene una razón para cambiar: cuando cambien las reglas de validación de usuarios.

### 2. UserRepository.js

Se crea el archivo:

`src/services/UserRepository.js`

Este componente se encarga únicamente del acceso a datos relacionado con usuarios.

Responsabilidades principales:

- Guardar usuarios en la base de datos.
- Buscar usuarios por correo electrónico.
- Encapsular las consultas SQL relacionadas con usuarios.
- Separar la lógica de persistencia de la lógica de negocio.

Este componente también aplica SRP porque solo cambia si cambia la forma de acceder o guardar los datos de usuarios.

Además, permite aplicar DIP porque la conexión a la base de datos se recibe desde afuera mediante el constructor. Esto evita que el repositorio cree internamente su propia conexión y permite cambiar la implementación de base de datos sin afectar directamente a las capas superiores.

### 3. EmailService.js

Se crea el archivo:

`src/services/EmailService.js`

Este componente se encarga únicamente del envío de correos y notificaciones.

Responsabilidades principales:

- Enviar correos electrónicos.
- Simular el envío de mensajes desde `notifications@greenmantenimientos.com`.
- Enviar correos de bienvenida a usuarios nuevos.
- Mantener separada la lógica de notificación de la lógica de usuarios.

Este componente aplica SRP porque solo tiene una razón para cambiar: cuando cambie la forma de enviar correos o notificaciones.

### 4. Inyección de dependencias

Se decide aplicar inyección de dependencias para que las clases no creen directamente sus dependencias internas.

Por ejemplo, `UserRepository` recibe la conexión de base de datos mediante el constructor:

```js
constructor(dbConnection) {
    this.db = dbConnection;
}
