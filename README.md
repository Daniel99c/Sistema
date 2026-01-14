Documentación Técnica
Sistema de Gestión de Egresados

Universidad Mariana

1. Descripción general del sistema

El Sistema de Gestión de Egresados es una aplicación web desarrollada con el propósito de facilitar la administración, seguimiento y consulta de la información de los egresados de la Universidad Mariana, permitiendo centralizar datos académicos, laborales y de contacto en un solo sistema.

El sistema permite a la institución mantener actualizada la información de sus egresados, apoyar procesos de seguimiento profesional y generar reportes que contribuyen a la toma de decisiones institucionales.

El proyecto fue desarrollado como un sistema web unificado en Laravel, integrando el frontend mediante React, lo que permite una interacción dinámica y una experiencia de usuario moderna.

Actualmente, el sistema se encuentra implementado y funcional, listo para ser desplegado en el entorno institucional.

2. Tecnologías utilizadas

Laravel (PHP)

React (integrado en Laravel)

PHP 8.1

JavaScript

MySQL

Node.js

NPM

Git

3. Requisitos del sistema
3.1 Requisitos previos obligatorios

Antes de instalar el sistema, el servidor o equipo debe contar con:

PHP >= 8.1

Composer

Node.js >= 18

NPM (incluido con Node.js)

MySQL >= 8.0

Servidor web (Apache o Nginx)

Navegador web actualizado

4. Instalación de Node.js y NPM
4.1 Descarga de Node.js

Acceder al sitio oficial de Node.js.

Descargar la versión LTS (Long Term Support).

Ejecutar el instalador y completar el proceso de instalación.

📌 Node.js incluye automáticamente NPM, por lo que no es necesario instalar NPM por separado.

4.2 Verificación de la instalación

Desde la terminal ejecutar:

node -v
npm -v


Si ambos comandos retornan una versión, la instalación es correcta.

5. Descarga del sistema

El sistema puede obtenerse de dos formas:

5.1 Clonación del repositorio
git clone https://github.com/USUARIO/sistema-egresados.git

5.2 Descarga en archivo comprimido

Acceder al repositorio del proyecto.

Seleccionar Code → Download ZIP.

Descomprimir el archivo en el servidor o equipo local.

6. Instalación del sistema
6.1 Instalación de dependencias del proyecto

Ubicarse en la carpeta raíz del proyecto y ejecutar:

Instalación de dependencias backend:

composer install


Instalación de dependencias frontend (React):

npm install


⚠️ Este paso es obligatorio para que la interfaz del sistema funcione correctamente.

7. Configuración del entorno

Copiar el archivo de entorno:

cp .env.example .env


Configurar la base de datos en el archivo .env:

DB_DATABASE=egresados
DB_USERNAME=usuario
DB_PASSWORD=contraseña


Generar la clave de la aplicación:

php artisan key:generate

8. Base de datos

Crear la base de datos en MySQL.

Ejecutar las migraciones:

php artisan migrate

9. Ejecución del sistema
9.1 Compilación del frontend
npm run dev


Este comando compila los componentes React integrados en Laravel.

9.2 Ejecución del backend
php artisan serve


El sistema quedará disponible desde el navegador web.

10. Estructura del sistema

El sistema mantiene una estructura unificada, donde:

Laravel gestiona:

Rutas

Autenticación

Seguridad

Lógica de negocio

Acceso a la base de datos

React gestiona:

Interfaz gráfica

Componentes

Navegación dinámica

Interacción con el backend

11. Roles del sistema

Administrador: Gestión total del sistema y usuarios.

Coordinador: Consulta y generación de reportes.

Egresado: Actualización y consulta de su información personal.

12. Estado del sistema

El sistema se encuentra instalado, configurado y listo para su despliegue, permitiendo la gestión eficiente de la información de los egresados de la Universidad Mariana.

13. Entrega del proyecto

El proyecto se entrega con:

Sistema funcional

Código fuente completo

Base de datos
