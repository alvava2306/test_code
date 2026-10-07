# VentaPro — Landing page base

Proyecto base de una landing page de ventas con 3 secciones, hecho en HTML, CSS y JavaScript puro (sin dependencias ni build).

## Estructura

```
landing-ventas/
├── index.html      # Marcado de la página
├── css/
│   └── styles.css  # Estilos, variables de diseño y responsive
├── js/
│   └── main.js     # Menú móvil, animaciones, contadores y formulario
└── README.md
```

## Secciones

1. **Hero (`#inicio`)** — propuesta de valor, llamados a la acción, métricas animadas y una tarjeta de ventas ilustrativa.
2. **Beneficios (`#beneficios`)** — cuadrícula de 4 características del producto.
3. **Contacto (`#contacto`)** — formulario para solicitar demo con validación.

## Cómo usarlo

Abre `index.html` directamente en el navegador, o sirve la carpeta localmente:

```bash
npx serve .
# o
python3 -m http.server 8000
```

## Personalización rápida

- **Colores y tipografía:** edita las variables en `:root` al inicio de `css/styles.css`.
- **Textos y marca:** cambia "VentaPro" y los textos en `index.html`.
- **Métricas del hero:** ajusta el atributo `data-count` de cada `<strong>`.
- **Envío del formulario:** en `js/main.js` busca el comentario `TODO` y reemplaza la simulación por un `fetch` a tu API, CRM o servicio de formularios (Formspree, HubSpot, etc.).

## Características

- Diseño responsive (escritorio, tablet y móvil) con menú hamburguesa.
- Animaciones de aparición al hacer scroll y contadores animados.
- Respeta `prefers-reduced-motion`.
- Formulario accesible con validación y mensajes en vivo (`aria-live`).
