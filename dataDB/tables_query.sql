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
    return_date DATE,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
