# MR. TEO EXPRESS - Plataforma de Gestión de Pedidos (MVP)

> **VERSIÓN:** 1.0.0 (MVP - Producto Mínimo Viable)
> **ESTADO:** En desarrollo activo / Fase de estabilización de despliegue Cloud.

---

## 📖 1. DESCRIPCIÓN DEL PROYECTO

**Mr. Teo Express** es una solución web diseñada para modernizar la atención en el restaurante "Mr. Teo". La aplicación permite reemplazar la toma de pedidos manual por un flujo digital donde el mozo o el cliente seleccionan productos desde un menú interactivo, generando una comanda digital que se procesa en tiempo real.

El proyecto sigue una arquitectura **Monorepo** desacoplada, utilizando contenedores Docker para garantizar que el entorno de desarrollo sea idéntico al de producción.

---

## 🛠 2. STACK TECNOLÓGICO

### **Frontend (Cliente Web)**
* **Framework:** React 18
* **Build Tool:** Vite (para una compilación ultrarrápida)
* **Lenguaje:** TypeScript / JavaScript (ES6+)
* **Estilos:** Tailwind CSS (Diseño responsivo y moderno)
* **Iconografía:** Lucide React
* **Comunicación:** Fetch API / Axios

### **Backend (API RESTful)**
* **Runtime:** Node.js (v18+)
* **Framework:** Express.js
* **Validación:** Zod (para integridad de datos)
* **Seguridad:** CORS configurado para entorno web

### **Base de Datos**
* **Motor:** PostgreSQL 15
* **ORM/Query:** Prisma o SQL nativo (según implementación interna)

### **Infraestructura & DevOps**
* **Contenerización:** Docker & Docker Compose
* **Servidor Web:** Nginx (Proxy Inverso)
* **Nube (Target):** AWS EC2 (Instancia t3.medium)
* **CI/CD:** GitHub Actions (Pipeline automatizado de construcción)

---

## 📂 3. ARQUITECTURA DEL PROYECTO (File Structure)

La estructura del código está organizada para separar responsabilidades claramente:

```text
MR-TEO-PROJECT/
│
├── .github/
│   └── workflows/
│       └── deploy.yml      # Pipeline de CI/CD para AWS
│
├── apps/
│   ├── api/                # LÓGICA DEL SERVIDOR (BACKEND)
│   │   ├── src/
│   │   │   ├── controllers/# Controladores de rutas
│   │   │   ├── models/     # Modelos de base de datos
│   │   │   └── routes/     # Definición de endpoints API
│   │   ├── Dockerfile      # Instrucciones de construcción API
│   │   └── package.json
│   │
│   └── web/                # INTERFAZ DE USUARIO (FRONTEND)
│       ├── src/
│       │   ├── components/ # Botones, Menús, Tarjetas
│       │   ├── pages/      # Vistas (Home, Carrito, Admin)
│       │   └── hooks/      # Lógica de estado
│       ├── Dockerfile      # Instrucciones de construcción Web
│       └── vite.config.ts
│
├── docker-compose.yml      # ORQUESTACIÓN DE SERVICIOS (La clave de todo)
└── README.md               # Este archivo
```
---

Aquí tienes el contenido desde la sección 4 en adelante, formateado para que puedas guardarlo directamente como un archivo .txt.

Plaintext

## 🚀 4. INSTALACIÓN Y EJECUCIÓN (Modo Local)

Para ejecutar este proyecto, necesitas tener instalado:
* **Git**
* **Docker Desktop** (Recomendado)
* (Opcional) Node.js v18+ si quieres correrlo sin Docker.

### ➤ OPCIÓN A: Ejecución con Docker (Recomendada 🌟)
Esta opción levanta la Base de Datos, el Backend y el Frontend con un solo comando, sin instalar dependencias en tu PC.

1.  **Clonar el repositorio:**
    git clone https://github.com/Kadumendez/IDAT_M06_PY.git
    cd IDAT_M06_PY

2.  **Configurar Variables de Entorno:**
    * El proyecto ya incluye configuración por defecto en `docker-compose.yml`.
    * No es necesario crear un `.env` manual para probar en local, Docker se encarga de inyectar:
        * `VITE_API_URL=http://localhost:3001`
        * `DATABASE_URL=postgresql://admin:password123@db:5432/mrteodb`

3.  **Levantar el Proyecto:**
    Ejecuta el siguiente comando en la raíz del proyecto:
    docker-compose up --build
    *(La primera vez tardará unos minutos descargando las imágenes de Node y Postgres).*

4.  **Acceder a la Aplicación:**
    Una vez que la terminal diga "Server running on port 3001" y "Vite ready in...", abre tu navegador:
    * **Web (Frontend):** http://localhost:80 (o http://localhost si el puerto 80 está libre).
    * **API (Backend):** http://localhost:3001

5.  **Detener la Aplicación:**
    Presiona `Ctrl + C` en la terminal o ejecuta:
    docker-compose down

---

### ➤ OPCIÓN B: Ejecución Manual (Sin Docker)
Si prefieres correrlo "a la antigua" instalando node_modules.

**1. Base de Datos:**
Necesitas tener PostgreSQL instalado y corriendo localmente.
Crea una base de datos llamada `mrteodb`.

**2. Levantar el Backend:**
cd apps/api
npm install
```
# Crea un archivo .env en /apps/api con: DATABASE_URL="postgresql://tu_usuario:tu_clave@localhost:5432/mrteodb"
npm run dev
```


**3. Levantar el Frontend:**
(En otra terminal)
cd apps/web
npm install
```
# Crea un archivo .env en /apps/web con: VITE_API_URL="http://localhost:3001"
npm run dev
```

---

## ⚠️ 5. ESTADO DEL DESPLIEGUE (AWS)

Actualmente, el proyecto cuenta con una configuración de **Infraestructura como Código (IaC)** y pipelines de **CI/CD** preparados para Amazon Web Services.

* **Arquitectura Cloud:** Diseñada para correr en una instancia **EC2 (t3.medium)** usando Docker Compose.
* **Estado Actual:** La integración con GitHub Actions está operativa (construcción y testing). El despliegue final vía SSH se encuentra en **fase de estabilización** para ajustar permisos de red (Security Groups) y persistencia de datos.
* **Próximos Pasos:**
    * Implementación de Certificado SSL (HTTPS) con Certbot.
    * Migración de base de datos a AWS RDS para producción.

---

## 👨‍💻 6. AUTORES

Proyecto desarrollado como parte del programa de especialización en Ingeniería de Software. MODULO 6 - Proyecto Integrador.


**Equipo de Desarrollo:**
* **Kadú Desposorio Mendez** - *DevOps & Backend Lead*
* **Nataly Salcedo Guerra** - *Frontend & QA Lead*

**Docente:**
* **Ing. Henry Vega Ayala**
---
© 2025 Mr. Teo Express - Todos los derechos reservados.
