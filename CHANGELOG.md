# Changelog

## v1.3.1

- Removed a forgotten viewTitle in package.json
- Translated the README to [English](https://github.com/JaviertINC/jtAlium/blob/main/README.md) and [Spanish](https://github.com/JaviertINC/jtAlium/blob/main/README.es.md).
- Improved marketing.

## v1.3.0

- Added the **Package Version Updater** tool.
    - Automatic scanning of all `package.json` files in the workspace.
    - Independent controls for Major, Minor and Patch of each package.
    - Real-time updating of `package.json` files.
    - Smart ordering: root package.json first, then alphabetical.
    - Click on the path to open the file directly in the editor.
    - Support for projects with multiple packages (Angular libraries, monorepos, etc.).

## v1.2.0

- Added the **Hide Resources** tool.
    - Implemented the option to add paths manually.
    - Implemented the option to hide files/folders in the context menu.
    - Optimized to open hidden files from the tool.
    - Added buttons to unhide per item or all at once.

## v1.1.0

- Now possible to apply custom colors in the **Workspace Color** tool.

## v1.0.0

- Extension launch.
- **Workspace Color** tool to apply colors to the top bar.

## Roadmap

- [x] Workspace Color: With predefined colors
- [x] Workspace Color: With custom colors
- [x] Hide resources: Hide folders or files you don't need to see
- [x] Package Version Updater: Major, Minor and patch
- [ ] Package Scripts Manager: Create, edit, run and delete
- [ ] Hides sensitive data: For PROPERTIES
- [ ] Hides sensitive data: For .env
- [ ] Autoclose unused old tabs