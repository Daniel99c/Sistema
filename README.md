# 🎓 Sistema de Gestión de Egresados

## 📖 Descripción General

El **Sistema de Gestión de Egresados** es una aplicación web desarrollada para la **Universidad Mariana**, orientada a la administración, seguimiento y actualización de la información de los egresados.

El sistema permite centralizar datos personales, académicos y laborales, facilitando el seguimiento profesional y apoyando la toma de decisiones institucionales mediante reportes y consultas.

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

## 🔐 Autenticación y Roles del Sistema

El sistema cuenta con control de acceso basado en roles:

- **Administrador:** gestión completa del sistema y usuarios.
- **Coordinador:** consulta y generación de reportes.
- **Egresado:** actualización y consulta de su información personal.

---

## 📚 Funcionalidades Principales

### 👤 Gestión de Egresados
- Registro y actualización de datos personales
- Gestión de información académica
- Registro de información laboral
- Gestión de habilidades y experiencia profesional

### 📊 Reportes
- Consulta general de egresados
- Generación de reportes institucionales
- Exportación de información

---

## ⚙️ Requisitos del Sistema

Antes de instalar el sistema, el servidor o equipo debe contar con:

- PHP >= 8.1  
- Composer  
- Node.js >= 18  
- NPM (incluido con Node.js)  
- MySQL >= 8.0  
- Servidor web (Apache o Nginx)  
- Navegador web actualizado  

---

## 📥 Obtención del Proyecto

El proyecto puede obtenerse de dos formas:

### 🔹 Clonación desde GitHub


git clone https://github.com/TU-USUARIO/sistema-egresados.git
🔹 Descarga en archivo comprimido
Acceder al repositorio del proyecto en GitHub

Seleccionar Code → Download ZIP

Descomprimir el archivo en el equipo o servidor

🚀 Instalación del Sistema

🧩 Todos los comandos se ejecutan en la raíz del proyecto

🟦 1️⃣ Instalación de Dependencias

📌 Backend + Frontend

composer install
npm install


⚠️ Este paso instala todas las dependencias necesarias para Laravel y React.

🟦 2️⃣ Configuración del Entorno
🛠️ Archivo de configuración
cp .env.example .env

🗄️ Configuración de Base de Datos (.env)
DB_DATABASE=egresados
DB_USERNAME=usuario
DB_PASSWORD=contraseña

🔐 Generar clave de la aplicación
php artisan key:generate

🟦 3️⃣ Base de Datos

🧱 Crear base de datos y ejecutar migraciones

php artisan migrate

🟦 4️⃣ Ejecución del Sistema
🎨 Compilar Frontend (React)
npm run dev

⚙️ Ejecutar Backend (Laravel)
php artisan serve


📍 El sistema quedará disponible desde el navegador web.

🗂️ Estructura del Proyecto

🏗️ Arquitectura Unificada

Laravel
 ├─ Rutas
 ├─ Autenticación
 ├─ Lógica de negocio
 ├─ Seguridad
 └─ Base de datos

React
 ├─ Interfaz gráfica
 ├─ Componentes
 └─ Navegación dinámica

✅ Estado del Sistema

🟢 Sistema operativo

El sistema se encuentra desarrollado, configurado y listo para su despliegue, siendo utilizado para la gestión institucional de egresados.

📦 Entrega del Proyecto

📁 Contenido entregable

✔ Sistema funcional
✔ Código fuente completo
✔ Base de datos
✔ Manual técnico
✔ Manual de usuario
✔ Video de instalación y uso
