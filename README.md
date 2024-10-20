# React + Vite

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Sincro360

## Descripción

Sincro360 es una aplicación web que utiliza Node.js para el backend y React con Vite para el frontend. La aplicación ofrece diversas funcionalidades incluyendo manejo de archivos, autenticación, integración con Cloudinary, mapas, y más.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Scripts](#scripts)
- [Configuración](#configuración)
- [Uso](#uso)
- [Dependencias](#dependencias)
- [Licencia](#licencia)

## Instalación

### Backend

1. Clona el repositorio:
    ```bash
    git clone <url_del_repositorio>](https://github.com/Veronicachase/Sincropfbackup.git)
    cd Backend
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

### Frontend

1. Navega al directorio del frontend:
    ```bash
    cd Frontend
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

## Scripts

### Backend

- `npm start`: Inicia el servidor utilizando Nodemon.
- `npm test`: Ejecuta las pruebas.

### Frontend

- `npm run dev`: Inicia el servidor de desarrollo de Vite.
- `npm run build`: Compila la aplicación para producción.
- `npm run lint`: Ejecuta ESLint para verificar el código.
- `npm run preview`: Previsualiza la compilación de producción.

## Configuración

### Backend

Crea un archivo `.env` en el directorio del backend y añade tus variables de entorno necesarias ejempo de como debe lucir.

```env
PORT=3000
DATABASE_URL=mysql://user:password@localhost:3306/database_name
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
#   S i n c r o p f b a c k u p 


 
 
