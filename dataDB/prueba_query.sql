USE prueba_db;

-- SELECT title, author , id
-- FROM books 
-- WHERE id IN (SELECT book_id FROM loans WHERE user_id = 1);


-- SELECT loan_date, return_date FROM loans WHERE user_id = 1;


SELECT 
    b.title, 
    b.author, 
    l.loan_date, 
    l.return_date
FROM 
    books b
JOIN 
    loans l 
ON 
    b.id = l.book_id
WHERE 
    l.user_id = 1;

