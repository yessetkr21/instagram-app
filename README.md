# 📸 Instagram App Clone

Un clon funcional de Instagram construido con **React**, **TypeScript**, **TailwindCSS** y **Convex**. Esta aplicación permite a los usuarios registrarse, crear perfiles, subir fotos, dar "likes" y navegar por un feed con actualizaciones en tiempo real. ¡Todo con una interfaz moderna y responsiva!

---

## 🎉 Funcionalidades Principales

### ✅ Sistema de Autenticación Completo
- Registro e inicio de sesión con **Convex Auth**
- Creación de perfil con nombre de usuario y biografía
- Sesiones de usuario seguras

### ✅ Compartir Fotos
- Subida de imágenes con descripciones
- Almacenamiento de imágenes usando **Convex file storage**
- Actualización del feed en tiempo real al subir nuevas fotos

### ✅ Funciones Sociales
- Dar "like" y quitar "like" a publicaciones
- Contador de "likes" en tiempo real
- Perfiles de usuario con estadísticas de publicaciones

### ✅ Interfaz de Usuario Moderna
- Diseño limpio y estilo similar a Instagram
- Layout adaptable (responsive) con **TailwindCSS**
- Navegación entre Feed, Subida y Perfil
- Manejo de estados de carga y errores

### ✅ Estructura de Base de Datos
- `Users`: Tabla de usuarios autenticados
- `Posts`: Tabla con imágenes y descripciones
- `Likes`: Tabla de interacciones sociales
- Perfiles con conteo de publicaciones y likes

---

## 🧩 Secciones de la App

- **Feed:** visualiza todas las publicaciones de los usuarios en orden cronológico.
- **Upload:** comparte nuevas fotos con una descripción.
- **Profile:** consulta tus publicaciones, estadísticas y detalles del perfil.
- **Actualizaciones en tiempo real:** los "likes" y las publicaciones se actualizan automáticamente para todos los usuarios.

---

## 🚀 Tecnologías Usadas

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Convex](https://convex.dev/)
- [Vite](https://vitejs.dev/)

---

## ⚙️ Instalación y Uso

1. Clona este repositorio:
   ```bash
   git clone https://github.com/yessetkr21/instagram-app
   cd instagram-app
## Instala las dependencias:
npm install
npm run dev
# @autor:yessetkr21
