# Reglas de Desarrollo - Aquiry

## Objetivo

Mantener consistencia de código, facilitar mantenimiento y reducir regresiones.

## Reglas principales

1. No mezclar JS ni CSS dentro de vistas PHP/HTML.
2. Todo JavaScript debe vivir en `js/`.
3. Todo CSS debe vivir en `css/`.
4. Las vistas solo deben contener estructura HTML/PHP y referencias a archivos estáticos.
5. Los controladores en `controller/` deben devolver JSON consistente para endpoints AJAX.
6. La lógica de negocio y acceso a datos debe permanecer en `model/`.
7. Evitar duplicar lógica: reutilizar funciones de utilidades compartidas cuando existan.
8. Validar sesión al inicio de endpoints protegidos.
9. No exponer errores sensibles en producción.
10. Mantener nombres de estados y campos alineados con base de datos.
11. Para recetas, respetar regla de negocio: edición y recarga de precios solo en estado Enviada.
12. Toda restricción crítica de negocio debe validarse en frontend y backend.

## Reglas para nuevas funcionalidades

1. Si se agrega un endpoint nuevo, documentarlo en `README.md`.
2. Si se agrega un flujo UI nuevo, incluir su archivo JS dedicado en `js/`.
3. Antes de cerrar cambios, validar errores de sintaxis/diagnóstico en los archivos editados.
4. Si se implementa o modifica tiempo real, documentar comportamiento funcional y estrategia de rendimiento en README.

## Reglas de estilo

1. Preferir cambios mínimos y focalizados.
2. Evitar refactor masivo si no es parte del requerimiento.
3. Mantener formato y convenciones ya usadas en el proyecto.
4. Usar comentarios solo cuando el bloque no sea evidente por sí mismo.