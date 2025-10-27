Aplicación fullstack desarrollada para las
El proyecto combina un frontend en React y un backend en Node.js + Express, conectados a una base de datos MySQL, con el objetivo de ofrecer una solución web moderna y funcional que optimice la experiencia del usuario.

---

## Descripción del proyecto

Su propósito es demostrar la capacidad de diseño, desarrollo y despliegue de una aplicación completa, integrando tecnologías modernas tanto del lado del cliente como del servidor.

El sistema fue diseñado con un enfoque modular y escalable, permitiendo:

- Gestión eficiente de usuarios y datos.
- Interfaz intuitiva y responsive.
- Comunicación fluida entre frontend y backend mediante API REST.
- Conexión a una base de datos MySQL, adaptable a entornos locales o servicios en la nube como Railway.

Este proyecto refleja la aplicación práctica de conocimientos en arquitectura web, desarrollo fullstack, manejo de entornos, y despliegue en producción.

---

## Tecnologías utilizadas

- Frontend: React
- Backend: Node.js + Express
- Base de datos: MySQL
- Gestor de paquetes: npm
- ORM / Conexión: Sequelize (u otro según la configuración del backend)

---

## Requisitos previos

Antes de comenzar, asegurate de tener instalado:

- Node.js (v16 o superior)
- MySQL Workbench
- Git
- (Opcional) Railway u otro servicio para despliegue remoto

---

## Estructura del proyecto

```

olimpiada-grupo-A/
├── backend/
│   ├── src/
│   ├── package.json
│   ├── .envExample
│   └── ...
├── frontend/
│   ├── src/
│   ├── package.json
│   └── public/
└── README.md

```

---

## Instalación y ejecución

Sigue estos pasos para ejecutar el proyecto correctamente:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/juanMarcosChalu/olimpiada-grupo-A.git
   cd olimpiada-grupo-A
   ```

````

2. **Instalar dependencias y limpiar instalaciones previas:**

   ```bash
   npm run clean-install
   ```

3. **Compilar el frontend:**

   ```bash
   npm run build
   ```

4. **Iniciar el servidor:**

   ```bash
   npm run start
   ```

5. **Configurar la base de datos:**

   * Abre MySQL Workbench.
   * Crea una nueva conexión.
   * Ejecuta el script SQL de la base de datos (incluido en el proyecto) para crear las tablas necesarias.

6. **Configurar variables de entorno (.env):**

   * En la carpeta `backend/`, crea un nuevo archivo llamado `.env`.
   * Copia el contenido del archivo `.envExample` y completá los datos de tu conexión local o remota.

   Ejemplo:

   ```env
   # Database / DB credentials
   USER="root"                      # Usuario de la base de datos
   PASSWORD="123456"                # Contraseña segura
   DATABASE="railway"               # Nombre de la base de datos

   # Puertos
   PORTBASE=35892                   # Puerto base del servicio o backend

   # App secrets
   SECRET="MiClaveSuperSecreta123"  # Clave secreta para JWT o sesiones
   ```

---

## Scripts disponibles

| Script                  | Descripción                                           |
| ----------------------- | ----------------------------------------------------- |
| `npm run clean-install` | Elimina e instala dependencias en frontend y backend. |
| `npm run build`         | Compila el proyecto del frontend para producción.     |
| `npm run start`         | Inicia la aplicación completa.                        |

---

## Autores

Proyecto desarrollado por **Grupo A** como parte de las *Olimpiadas Nacionales de Programación 2025*.

**Integrantes principales:**
[Juan Marcos Chalú](https://github.com/juanMarcosChalu)
(Bruno Valenzuela)(https://github.com/k38bru)
(Jeremias Cepeda)(https://github.com/jerecepedaalf)
(Martina Gutierrez) (https://github.com/margutierrezinf)
(Gianluca Rivero)
````
