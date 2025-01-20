USE prueba_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(40) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE books (
    id INT AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(50) NOT NULL,
    year_of_publication DATE DEFAULT NULL,
    available TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE loans (
    book_id INT,
    user_id INT,
    loan_date DATE,
    return_date DATE DEFAULT NULL,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);


-- Insertar datos en la tabla users
INSERT INTO users (name, email) VALUES
('Juan Pérez', 'juan.perez@example.com'),
('María Gómez', 'maria.gomez@example.com'),
('Carlos López', 'carlos.lopez@example.com'),
('Ana Fernández', 'ana.fernandez@example.com');

-- Insertar datos en la tabla books
INSERT INTO books (title, author, year_of_publication, available) VALUES
('Cien Años de Soledad', 'Gabriel García Márquez', '1967-05-30',1),
('1984', 'George Orwell', '1949-06-08',1),
('El Principito', 'Antoine de Saint-Exupéry', '1943-04-06',0),
('Don Quijote de la Mancha', 'Miguel de Cervantes', '1605-01-16',1);

-- Insertar datos en la tabla loans
-- Nota: Los IDs usados aquí deben coincidir con los existentes en las tablas users y books.
INSERT INTO loans (book_id, user_id, loan_date, return_date) VALUES
(1, 1, '2024-12-01', '2024-12-15'),
(2, 2, '2024-12-03', '2024-12-17'),
(3, 4, '2024-12-05', NULL), -- NULL indica que el libro aún no ha sido devuelto
(4, 1, '2024-11-20', '2024-12-01');

