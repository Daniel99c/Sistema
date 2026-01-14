# Sistema de Gestión de Egresados 🎓

## Descripción General

Sistema web desarrollado para la **Universidad Mariana**, orientado a la gestión, seguimiento y actualización de la información de los egresados.  
Permite centralizar datos personales, académicos y laborales, facilitando la generación de reportes y el apoyo a la toma de decisiones institucionales.

El sistema fue desarrollado como un **proyecto unificado en Laravel**, integrando el frontend mediante **React Starter Kit**, y utilizando **MySQL** como gestor de base de datos.

---

## Funcionalidades Principales

### 🔐 Autenticación y Gestión de Usuarios
- Registro e inicio de sesión seguro
- Control de acceso basado en roles
- Gestión de permisos por tipo de usuario

### 👤 Gestión de Egresados
- Registro y actualización de información personal
- Gestión de datos académicos
- Registro de información laboral
- Gestión de habilidades blandas y duras

### 📊 Reportes
- Consulta general de egresados
- Reportes por información académica y laboral
- Exportación de reportes en PDF y TXT

### 🧭 Seguimiento Institucional
- Actualización periódica de información
- Visualización consolidada de datos
- Apoyo a procesos administrativos y académicos

---

## Tecnologías Utilizadas

### Frontend
- React.js (React Starter Kit)
- TypeScript
- Tailwind CSS
- Inertia.js

### Backend
- Laravel (PHP)
- MySQL

### Herramientas de Desarrollo
- Node.js
- NPM
- Composer
- Vite.js
- Git

---

## Requisitos de Instalación

### Requisitos Previos
- PHP >= 8.1
- Node.js >= 18
- NPM
- Composer
- MySQL >= 8.0
- Servidor web (Apache o Nginx)

---

## Instalación y Configuración

### Clonar el Repositorio

```bash
git clone https://github.com/Daniel99c/gestion-egresados.git
cd gestion-egresados

Instalar Dependencias
Backend (Laravel)
composer install

Frontend (React)
npm install

Configurar el Entorno
cp .env.example .env
php artisan key:generate

Configurar la Base de Datos

Crear la base de datos en MySQL

Configurar credenciales en el archivo .env

php artisan migrate

Compilar Assets
npm run dev

Iniciar el Servidor
php artisan serve

Estructura del Proyecto
gestion-egresados/
├── app/                  # Lógica de la aplicación
├── resources/
│   ├── js/              # Componentes React
│   │   ├── pages/       # Páginas del sistema
│   │   └── components/  # Componentes reutilizables
│   └── views/           # Vistas Blade
├── routes/              # Definición de rutas
├── database/            # Migraciones y seeders
└── public/              # Archivos públicos
