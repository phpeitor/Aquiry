# Aira Dashboard
[![forthebadge](https://forthebadge.com/badges/validated-html5.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/badges/built-with-love.svg)](https://www.linkedin.com/in/drphp/)

<a href="https://www.instagram.com/amvsoft.tech/" target="_blank">
  <img src="https://pbs.twimg.com/profile_images/1012619468604755968/allRIIOy.jpg" alt="Instagram" width="300">
</a>

## Overview

Aira Dashboard is a static web dashboard and login experience built for Apache-hosted environments. The project combines a reusable HTML layout system, a Rive-powered login animation, Bootstrap-based UI assets, and dashboard pages that can be served directly from the web root without a build step.

The current login flow uses `@rive-app/canvas`, Alertify notifications, and a demo credential check before redirecting to the dashboard.

## Tech Stack

- HTML5 static pages
- CSS3 custom styling
- JavaScript ES modules and browser scripts
- Bootstrap assets
- Rive canvas runtime
- AlertifyJS notifications
- Apache static hosting

## Project Structure

```text
.
|-- css/                  # Vendor and custom styles
|-- images/               # Template images and logos
|-- js/                   # App, layout, dashboard, and login scripts
|-- layout/               # Reusable HTML partials
|-- resources/            # Rive, video, and static media assets
|-- dashboard.html        # Main dashboard page
`-- index.html            # Login page
```

## Layout Partials

The dashboard layout is split into reusable partials under `layout/`:

- `layout/header.html`
- `layout/sidebar-menu.html`
- `layout/sidebar-left.html`
- `layout/menu.html`
- `layout/footer.html`
- `layout/rightbar.html`
- `layout/switcher.html`

Partials are loaded by `js/layout-loader.js` through elements using `data-layout-include`.

Example:

```html
<div data-layout-include="layout/header.html"></div>
```

Nested partials are supported. For example, both sidebar templates load `layout/menu.html` so menu changes only need to be maintained in one place.

## Login Flow

The login page is `index.html` and is powered by `js/login-rive.js`.

Demo credentials:

```text
User: demo@demo.com
Password: demo123
```

Behavior:

- Empty fields show validation styling and an Alertify error message.
- Invalid credentials trigger an error animation and show an Alertify error message.
- Valid credentials trigger a success animation, show an Alertify success message, then redirect to `dashboard.html` after a short delay.
- Password input triggers the Rive thinking animation.

## Rive Integration

The Rive asset is located at:

```text
resources/aira.riv
```

Runtime configuration:

- Artboard: `aira artboard`
- State machine: `State Machine 5`
- Runtime: `@rive-app/canvas`
- Canvas element: `#rive-canvas`

Animation mappings are maintained in `js/login-rive.js` through `stateTriggerMap`.

## Running Locally

Serve the project through Apache or another local HTTP server. Do not open `index.html` directly with `file://`, because browser security restrictions can block asset loading.

Apache example:

```text
http://127.0.0.1/davila/
```

## Development Notes

- Keep shared navigation changes in `layout/menu.html`.
- Keep layout shell changes in the relevant partial under `layout/`.
- Use cache-busting query strings when changing CSS or JS referenced by static HTML pages.
- Validate JavaScript syntax with `node --check` when editing standalone scripts.
- Avoid duplicating layout markup in individual pages unless the page intentionally diverges from the shared layout.

## Verification Checklist

Before shipping changes, verify:

- `index.html` loads without console errors.
- `resources/aira.riv` returns `200 OK` from the server.
- Empty login fields show validation and an error animation.
- Wrong credentials show Alertify error and an error animation.
- Correct credentials show Alertify success, play success animation, and redirect to `dashboard.html`.
- Dashboard layout partials load correctly.
- Sidebar menu items render from `layout/menu.html`.

## Browser Cache

If recent changes do not appear, perform a hard refresh:

```text
Ctrl + F5
```

Static pages in this project use query string versions on CSS and JS files to reduce stale browser-cache issues during development.
