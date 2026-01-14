# Sistema de Gestión de Egresados - Universidad Mariana 🎓

## Descripción General

Sistema web para la gestión y seguimiento de egresados del programa de Ingeniería de Sistemas de la Universidad Mariana. Permite administrar información personal, académica y laboral de los egresados, facilitando la comunicación institucional, el análisis de empleabilidad y la visualización geográfica de la comunidad de exalumnos.

## Funcionalidades Principales

### 🔐 Autenticación y Gestión de Usuarios

- Registro e inicio de sesión seguro
- Recuperación de contraseña por correo electrónico
- Sistema de roles diferenciados (Egresado, Coordinador, Administrador)
- Panel de administración personalizado por rol

### 👤 Gestión de Perfiles de Egresados

- Registro y actualización de información personal
- Gestión de información de contacto y ubicación
- Barra de progreso de completitud de perfil
- Validación de campos obligatorios

### 📚 Historial Académico

- Registro de formación académica (pregrado, posgrado, cursos)
- Gestión de títulos obtenidos
- Biblioteca de certificados digitales
- Validación de coherencia temporal

### 💼 Experiencia Laboral

- Registro de historial laboral completo
- Información de empresas, cargos y funciones
- Modalidad de trabajo (presencial, remoto, híbrido)
- Vista en tabla y tarjetas

### 🗺️ Visualización Geográfica

- Mapa interactivo de distribución de egresados
- Marcadores con información básica del egresado
- Filtros por año de graduación y sector laboral
- Identificación de concentraciones geográficas

### 📰 Sistema de Noticias

- Creación, edición y eliminación de noticias (Coordinadores)
- Visualización de noticias universitarias
- Ordenamiento cronológico automático
- Sección de "Últimas Noticias" en dashboard

### 📊 Reportes y Estadísticas

- Generación de reportes detallados con filtros
- Estadísticas de empleabilidad
- Distribución por género y ubicación
- Exportación en formato PDF y Excel

## Tecnologías Utilizadas

### Frontend

- React.js con Inertia.js
- Tailwind CSS para estilos
- Lucide React para iconos
- Shadcn/UI para componentes

### Backend

- Laravel 11 (PHP)
- MySQL para base de datos
- API RESTful

### Herramientas de Desarrollo

- Vite.js
- ESLint
- Prettier
- PHP CS Fixer

## Requisitos de Instalación

### Requisitos Previos

- PHP >= 8.0
- Node.js >= 16.0
- Composer
- MySQL

### Dependencias Principales
```json
{
  "dependencies": {
    "@inertiajs/react": "^1.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "lucide-react": "^0.263.1",
    "tailwindcss": "^3.x.x"
  }
}
```

## Instalación y Configuración

### 1. Clonar el Repositorio
```bash
git clone https://github.com/Daniel99c/gestionEgresados.git
cd gestionEgresados
```

### 2. Instalar Dependencias de PHP
```bash
composer install
```

### 3. Instalar Dependencias de Node.js
```bash
npm install
```

### 4. Configurar el Entorno
```bash
cp .env.example .env
php artisan key:generate
```

### 5. Configurar la Base de Datos

- Crear base de datos MySQL
- Actualizar credenciales en .env
```bash
php artisan migrate
```

### 6. Compilar Assets
```bash
npm run dev
```

### 7. Iniciar el Servidor
```bash
php artisan serve
```

## Estructura del Proyecto
```
gestionEgresados/
├── app/                 # Lógica de la aplicación
├── resources/
│   ├── js/             # Componentes React
│   │   ├── Pages/      # Páginas de la aplicación
│   │   └── Components/ # Componentes reutilizables
│   └── views/          # Vistas blade
├── routes/             # Definición de rutas
├── database/          # Migraciones y seeders
└── public/            # Archivos públicos
```

Este proyecto está bajo la Licencia MIT - ver el archivo **LICENSE.md** para más detalles.
