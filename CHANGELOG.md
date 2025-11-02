# Historial de cambios

## v1.3.0

- Se agrega la herramienta **Package Version Updater**.
    - Escaneo automático de todos los archivos `package.json` en el workspace.
    - Controles independientes para Major, Minor y Patch de cada paquete.
    - Actualización en tiempo real de los archivos `package.json`.
    - Orden inteligente: package.json root primero, luego alfabético.
    - Click en el path para abrir el archivo directamente en el editor.
    - Soporte para proyectos con múltiples paquetes (librerías Angular, monorepos, etc.).

## v1.2.0

- Se agrega la herramienta **Hide Resources**.
    - Se implementa la opción para agregar paths manualmente.
    - Se implementa la opción para ocultar archivos/carpetas en el menú contextual.
    - Se optimiza para abrir los archivos ocultos desde la herramienta.
    - Se agregan botones para descultar por elemento o todos a la vez.

## v1.1.0

- Ahora es posible aplicar colores personalizados en la herramienta **Workspace Color**.

## v1.0.0

- Lanzamiento de la extensión.
- Herramienta **Wokrspace Color** para aplicar colores a la barra superior.

## Roadmap

- [x] Workspace Color: Con temas predefinidos
- [x] Workspace Color: Con temas personalizados
- [x] Hide resources: Oculta carpetas o archivos que no necesitas ver
- [x] Package Version Updater: Major, Minor y patch
- [ ] Hides sensitive data: Para iPROPERTIES
- [ ] Hides sensitive data: Para .env
- [ ] Autoclose unused old tabs