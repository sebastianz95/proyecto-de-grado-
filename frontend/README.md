# 🚀 Inventa — Guía de instalación completa

## Estructura del proyecto

```
inventa-react/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx              ← Punto de entrada React
│   ├── App.jsx               ← Rutas (React Router)
│   ├── styles/
│   │   └── global.css
│   ├── components/
│   │   ├── Layout.jsx        ← Sidebar + Outlet
│   │   └── Layout.css
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Inventario.jsx    ← Conectado a Spring Boot
│   │   ├── Ordenes.jsx
│   │   ├── Proveedores.jsx
│   │   ├── Reportes.jsx
│   │   └── Configuracion.jsx
│   └── services/
│       └── api.js            ← Todas las llamadas al backend
└── backend/
    ├── pom.xml
    └── src/main/java/com/inventa/backend/
        ├── BackendApplication.java
        ├── controller/ProductoController.java
        ├── model/Producto.java
        └── repository/ProductoRepository.java
```

---

## 📦 PASO 1 — Instalar herramientas

### Node.js (para React)
1. Ve a https://nodejs.org
2. Descarga la versión **LTS** (la recomendada)
3. Instala normalmente (siguiente, siguiente, finalizar)
4. Verifica: abre CMD o terminal y escribe:
   ```
   node -v
   npm -v
   ```

### Java 17 (para Spring Boot)
1. Ve a https://adoptium.net
2. Descarga **Temurin 17 LTS**
3. Instala y verifica:
   ```
   java -version
   ```

### Maven (para compilar Spring Boot)
1. Ve a https://maven.apache.org/download.cgi
2. Descarga el zip binario
3. Descomprime en `C:\maven`
4. Agrega `C:\maven\bin` a las variables de entorno PATH
5. Verifica:
   ```
   mvn -v
   ```

### MySQL (base de datos)
1. Ve a https://dev.mysql.com/downloads/installer/
2. Descarga **MySQL Installer** (el más pequeño, ~2MB, descarga lo demás solo)
3. Instala **MySQL Server** y **MySQL Workbench**
4. Durante la instalación elige una contraseña para el usuario `root` — anótala

---

## 🗃️ PASO 2 — Crear la base de datos

1. Abre **MySQL Workbench**
2. Conéctate con usuario `root` y tu contraseña
3. Ejecuta este SQL:

```sql
CREATE DATABASE inventa_db;
USE inventa_db;
-- Spring Boot crea las tablas automáticamente con ddl-auto=update
```

---

## ⚙️ PASO 3 — Configurar Spring Boot

Abre el archivo:
```
backend/src/main/resources/application.properties
```

Cambia esta línea con tu contraseña real de MySQL:
```
spring.datasource.password=TU_PASSWORD_AQUI
```

---

## ▶️ PASO 4 — Ejecutar el backend

Abre una terminal en la carpeta `backend/` y escribe:

```bash
mvn spring-boot:run
```

Deberías ver: `Started BackendApplication on port 8080`

Prueba en el navegador: http://localhost:8080/api/productos
(Debe responder `[]` — lista vacía)

---

## ▶️ PASO 5 — Ejecutar el frontend React

Abre **otra terminal** en la carpeta raíz `inventa-react/` y escribe:

```bash
npm install
npm run dev
```

Abre en el navegador: http://localhost:3000

---

## 🔁 Cómo se conectan React y Spring Boot

```
React (puerto 3000)
     ↓ fetch("/api/productos")
     ↓ vite.config.js redirige a →
Spring Boot (puerto 8080)
     ↓ ProductoController.java
     ↓ ProductoRepository.java
MySQL (inventa_db)
```

---

## 🛠️ IDEs recomendados (gratis)

| Herramienta | Para qué | Descarga |
|---|---|---|
| VS Code | React / Frontend | https://code.visualstudio.com |
| IntelliJ IDEA Community | Spring Boot / Java | https://www.jetbrains.com/idea/download |
| MySQL Workbench | Base de datos | Viene con MySQL Installer |

---

## ❓ Errores comunes

| Error | Solución |
|---|---|
| `Access denied for user 'root'` | Revisa la contraseña en application.properties |
| `CORS error` en React | Ya está configurado con @CrossOrigin en el controller |
| `npm not found` | Reinicia la terminal después de instalar Node.js |
| Puerto 8080 ocupado | Cambia `server.port=8081` en application.properties |
