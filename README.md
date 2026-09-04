# Aira Dashboard
[![forthebadge](https://forthebadge.com/badges/validated-html5.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/badges/built-with-love.svg)](https://www.linkedin.com/in/drphp/)

<a href="https://www.instagram.com/amvsoft.tech/" target="_blank">
  <img src="https://pbs.twimg.com/profile_images/1012619468604755968/allRIIOy.jpg" alt="Instagram" width="300">
</a>

## Descripcion General

Aira Dashboard es una experiencia de login y dashboard web estatico pensada para ejecutarse en entornos hospedados con Apache. El proyecto combina un sistema de layouts HTML reutilizables, una animacion de login con Rive, recursos UI basados en Bootstrap y paginas de dashboard que pueden servirse directamente desde el web root sin proceso de build.

El flujo actual de login usa `@rive-app/canvas`, notificaciones con AlertifyJS y una validacion de credenciales demo antes de redirigir al dashboard.

## Stack Tecnico

- Paginas estaticas HTML5
- Estilos personalizados CSS3
- JavaScript para navegador
- Recursos UI de Bootstrap
- Runtime canvas de Rive
- Notificaciones con AlertifyJS
- Hosting estatico con Apache

## Estructura Del Proyecto

```text
.
|-- css/                  # Estilos vendor y personalizados
|-- images/               # Imagenes y logos del template
|-- js/                   # Scripts de app, layout, dashboard y login
|-- layout/               # Parciales HTML reutilizables
|-- resources/            # Assets Rive, videos y recursos estaticos
|-- dashboard.html        # Pagina principal del dashboard
`-- index.html            # Pagina de login
```

## Parciales De Layout

El layout del dashboard esta dividido en parciales reutilizables dentro de `layout/`:

- `layout/header.html`
- `layout/sidebar-menu.html`
- `layout/sidebar-left.html`
- `layout/menu.html`
- `layout/footer.html`
- `layout/rightbar.html`
- `layout/switcher.html`

Los parciales se cargan mediante `js/layout-loader.js` usando elementos con `data-layout-include`.

Ejemplo:

```html
<div data-layout-include="layout/header.html"></div>
```

Tambien se soportan parciales anidados. Por ejemplo, ambos sidebars cargan `layout/menu.html`, por lo que los cambios del menu se mantienen en un solo archivo.

## Flujo De Login

La pagina de login es `index.html` y su comportamiento esta implementado en `js/login-rive.js`.

Comportamiento:

- Los campos vacios muestran estilos de validacion y un mensaje de error con AlertifyJS.
- Las credenciales invalidas disparan una animacion de error y muestran un mensaje de error con AlertifyJS.
- Las credenciales validas disparan una animacion de exito, muestran un mensaje con AlertifyJS y luego redirigen a `dashboard.html` despues de una pausa breve.
- Al escribir en el campo password se dispara la animacion de pensamiento de Rive.

## Integracion Con Rive

El asset de Rive esta ubicado en:

```text
resources/aira.riv
```

Configuracion del runtime:

- Artboard: `aira artboard`
- State machine: `State Machine 5`
- Runtime: `@rive-app/canvas`
- Elemento canvas: `#rive-canvas`

El mapeo de animaciones se mantiene en `js/login-rive.js` mediante `stateTriggerMap`.

## Notas De Desarrollo

- Mantener los cambios de navegacion compartida en `layout/menu.html`.
- Mantener los cambios del shell de layout en el parcial correspondiente dentro de `layout/`.
- Usar query strings de cache busting cuando se modifiquen CSS o JS referenciados por paginas HTML estaticas.
- Validar la sintaxis JavaScript con `node --check` al editar scripts standalone.
- Evitar duplicar markup de layout en paginas individuales salvo que la pagina deba separarse intencionalmente del layout compartido.

## Checklist De Verificacion

Antes de publicar cambios, verificar:

- `index.html` carga sin errores en consola.
- `resources/aira.riv` responde `200 OK` desde el servidor.
- Los campos vacios del login muestran validacion y animacion de error.
- Las credenciales incorrectas muestran error con AlertifyJS y animacion de error.
- Las credenciales correctas muestran exito con AlertifyJS, reproducen animacion de exito y redirigen a `dashboard.html`.
- Los parciales del layout del dashboard cargan correctamente.
- Los items del sidebar se renderizan desde `layout/menu.html`.

Las paginas estaticas del proyecto usan versiones por query string en archivos CSS y JS para reducir problemas de cache durante el desarrollo.