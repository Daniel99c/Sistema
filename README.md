# 🎓 Sistema de Gestión de Egresados

## 📖 Descripción General

El **Sistema de Gestión de Egresados** es una aplicación web desarrollada para la **Universidad Mariana**, orientada a la administración, seguimiento y actualización de la información de sus egresados.

El sistema permite centralizar datos personales, académicos y laborales, facilitando el seguimiento profesional de los egresados y apoyando la toma de decisiones institucionales mediante reportes y consultas.

El proyecto fue desarrollado como un **sistema unificado en Laravel**, integrando el frontend mediante **React Starter Kit**, y utilizando una base de datos **MySQL**.

---

## 🛠️ Tecnologías Utilizadas

- **Laravel (PHP)**
- **React (React Starter Kit)**
- **PHP 8.1**
- **JavaScript**
- **MySQL**
- **Node.js**
- **NPM**
- **Git**

---

## 🔐 Autenticación y Gestión de Usuarios

- Inicio de sesión seguro
- Gestión de roles y permisos
- Control de acceso según el rol del usuario

**Roles del sistema:**
- Administrador
- Coordinador
- Egresado

---

## 📚 Gestión de Información del Egresado

- Registro y actualización de datos personales
- Información académica del egresado
- Registro de información laboral
- Gestión de habilidades y experiencia profesional

---

## 📊 Reportes y Consultas

- Consulta de información general de egresados
- Generación de reportes por parte del coordinador
- Exportación de reportes en formatos digitales

---

## ⚙️ Requisitos del Sistema

- PHP >= 8.1
- Composer
- Node.js >= 18
- NPM
- MySQL >= 8.0
- Servidor web (Apache o Nginx)
- Navegador web actualizado

---

## 🚀 Instalación del Proyecto

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/TU-USUARIO/sistema-egresados.git
O descargar el proyecto en formato .zip desde GitHub.

2️⃣ Instalación de dependencias
Ubicarse en la carpeta raíz del proyecto y ejecutar:

bash
Copiar código
composer install
npm install
3️⃣ Configuración del entorno
bash
Copiar código
cp .env.example .env
php artisan key:generate
Configurar la base de datos en el archivo .env.

4️⃣ Migraciones de base de datos
bash
Copiar código
php artisan migrate
5️⃣ Ejecución del sistema
Compilar el frontend:

bash
Copiar código
npm run dev
Ejecutar el backend:

bash
Copiar código
php artisan serve
El sistema estará disponible desde el navegador web.

🗂️ Estructura del Sistema
Laravel: lógica de negocio, seguridad, autenticación y base de datos

React: interfaz gráfica, componentes y navegación dinámica

✅ Estado del Sistema
El sistema se encuentra desarrollado, configurado y listo para su despliegue, permitiendo la gestión eficiente de la información de los egresados de la Universidad Mariana.

📦 Entrega del Proyecto
Sistema funcional

Código fuente completo

Base de datos
