# Frontend Standards - Aquiry

## Objetivo

Mantener interfaces consistentes, seguras y mantenibles para los modulos de cotizaciones, recetas, carga de items, usuarios, dashboard y exportaciones relacionadas.

## Stack y ubicacion

- JavaScript del proyecto: `js/`.
- CSS del proyecto: `css/`.
- Vistas PHP/HTML: raiz del proyecto y archivos de pantalla existentes.
- UI base: Bootstrap, Grid.js, Alertify y librerias ya incluidas en `js/`.
- No agregar JavaScript ni CSS inline en vistas. Las vistas solo deben renderizar estructura, datos `data-*` y referencias a assets.

## Reglas obligatorias

1. Todo JavaScript nuevo debe vivir en un archivo dedicado dentro de `js/`.
2. Todo CSS nuevo debe vivir en un archivo dedicado dentro de `css/`.
3. Las vistas no deben mezclar logica de negocio ni calculos extensos; deben delegar en JS o backend segun corresponda.
4. Los datos enviados desde PHP hacia JS deben exponerse con atributos `data-*` o endpoints JSON, no con bloques `<script>` inline.
5. Toda restriccion critica de negocio debe validarse tambien en backend.
6. Mantener nombres de estados y campos alineados con la base de datos.

## Formularios y validacion

- Validar entradas antes de enviar al backend: cantidades, tipo de cambio, margenes, fechas y campos obligatorios.
- Usar rangos consistentes con backend. 
- Normalizar numeros ingresados por usuario aceptando coma o punto solo cuando el flujo existente lo haga.
- Mostrar errores claros al usuario, sin exponer trazas ni detalles internos.
- Deshabilitar botones mientras una operacion asincrona esta en curso para evitar doble envio.

## Fetch y endpoints AJAX

- Consumir controladores en `controller/` mediante `fetch` o patrones ya existentes.
- Esperar respuestas JSON consistentes con banderas como `ok` o `success` y `message`.
- Manejar errores de red, respuestas no validas y sesiones expiradas.
- No confiar en validaciones del frontend para seguridad; el backend decide autorizacion, estado y persistencia.

## Seguridad de UI

- Escapar HTML antes de interpolar datos de servidor o usuario en plantillas JS.
- No construir HTML con datos crudos sin sanitizacion.
- No exponer tokens, credenciales ni variables de entorno en vistas o assets.
- No depender de ocultar botones como unica medida de seguridad.

## Checklist antes de cerrar

1. No hay JS/CSS inline nuevo.
2. El archivo JS o CSS dedicado esta referenciado por la vista correspondiente.
3. Las validaciones criticas existen tambien en backend.
4. Los errores al usuario son claros y no filtran informacion sensible.
5. El flujo funciona en desktop y mobile cuando la vista sea usada por usuarios finales.
