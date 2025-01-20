# biblioteca_virtual
Ejercicio de Práctica: Gestión de una Biblioteca Virtual

### Ejercicio de Práctica: **Gestión de una Biblioteca Virtual**

Crea una aplicación que gestione una biblioteca virtual usando una estructura de componentes autocontenidos. La aplicación debe permitirte realizar operaciones básicas como agregar libros, registrar usuarios y manejar préstamos de libros.

---

### **Requisitos:**

1. **Componentes a desarrollar:**
   - **`books`**: Maneja información de los libros.
   - **`users`**: Maneja información de los usuarios.
   - **`loans`**: Maneja el préstamo de libros entre usuarios.

2. **Operaciones principales:**
   - **Libros (`books`):**
     - Agregar un libro.
     - Obtener todos los libros.
     - Buscar un libro por título o ID.
   - **Usuarios (`users`):**
     - Registrar un usuario.
     - Obtener información de un usuario por ID.
   - **Préstamos (`loans`):**
     - Registrar el préstamo de un libro a un usuario.
     - Devolver un libro.
     - Consultar el historial de préstamos de un usuario.

3. **Restricciones:**
   - Un libro no puede ser prestado si ya está prestado.
   - Al devolver un libro, debe marcarse como disponible.

4. **Base de datos:**
   - Usa una base de datos.
   - Cada componente debe tener su propio modelo definido en MariaDB utilizando Sequelize.

---

### **Estructura esperada del proyecto**

```plaintext
library-app/
├── app.js            # Punto de entrada del servidor
├── books/
│   ├── api.js        # Rutas relacionadas con libros
│   ├── service.js    # Lógica de negocio de libros
│   ├── model.js      # Modelo de datos de libros
│   ├── tests/        # Pruebas unitarias de libros
├── users/
│   ├── api.js        # Rutas relacionadas con usuarios
│   ├── service.js    # Lógica de negocio de usuarios
│   ├── model.js      # Modelo de datos de usuarios
│   ├── tests/        # Pruebas unitarias de usuarios
├── loans/
│   ├── api.js        # Rutas relacionadas con préstamos
│   ├── service.js    # Lógica de negocio de préstamos
│   ├── model.js      # Modelo de datos de préstamos
│   ├── tests/        # Pruebas unitarias de préstamos
└── shared/
    ├── db.js         # Configuración de la conexión a la base de datos
    ├── utils.js      # Funciones comunes (validaciones, formateo, etc.)
```

---

### **Ejercicio:**

#### **Parte 1: Crear el componente `books`**
1. Define un modelo para los libros que contenga:
   - `title` (String): Título del libro.
   - `author` (String): Autor del libro.
   - `year` (Number): Año de publicación.
   - `available` (Boolean): Indica si el libro está disponible para préstamo.

2. Implementa las siguientes rutas en `books/api.js`:
   - **POST /books**: Agrega un nuevo libro.
   - **GET /books**: Obtiene todos los libros.
   - **GET /books/:id**: Busca un libro por ID.

3. Prueba estas rutas utilizando Postman o curl.

---

#### **Parte 2: Crear el componente `users`**
1. Define un modelo para los usuarios con:
   - `name` (String): Nombre del usuario.
   - `email` (String): Email único.
   - `loans` (Array): Lista de libros actualmente prestados por el usuario.

2. Implementa las siguientes rutas en `users/api.js`:
   - **POST /users**: Registra un nuevo usuario.
   - **GET /users/:id**: Obtiene la información de un usuario.

3. Prueba estas rutas para registrar usuarios y verificar su información.

---

#### **Parte 3: Crear el componente `loans`**
1. Define un modelo para los préstamos con:
   - `bookId` (ObjectId, referencia a `books`): Libro prestado.
   - `userId` (ObjectId, referencia a `users`): Usuario que tomó prestado el libro.
   - `loanDate` (Date): Fecha del préstamo.
   - `returnDate` (Date): Fecha de devolución (si ya fue devuelto).

2. Implementa las siguientes rutas en `loans/api.js`:
   - **POST /loans**: Registra el préstamo de un libro.
   - **PUT /loans/:id/return**: Marca un libro como devuelto.
   - **GET /loans/user/:userId**: Obtiene el historial de préstamos de un usuario.

3. Agrega la lógica en `loans/service.js` para verificar que:
   - El libro esté disponible antes de realizar el préstamo.
   - Al devolver un libro, se actualice su estado a disponible.

---

#### **Parte 4: Pruebas Unitarias**
- Crea pruebas para cada componente en sus respectivas carpetas `tests/`.
- Asegúrate de probar:
  - La creación de libros, usuarios y préstamos.
  - Las validaciones al prestar o devolver libros.

---

### **Desafío adicional (opcional):**
1. Agrega autenticación básica (por ejemplo, con `jsonwebtoken`) para restringir ciertas rutas a usuarios autenticados.
2. Implementa paginación en las rutas `GET /books` y `GET /loans/user/:userId`.
3. Agrega validaciones más estrictas, como:
   - No permitir correos duplicados para usuarios.
   - Rechazar préstamos si el usuario ya tiene demasiados libros prestados.

---
