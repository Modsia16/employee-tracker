USE departments_db;

/* === || DEPARTMENT ARRAY || === */
INSERT INTO departments (department_title)
VALUES ("Management"),
       ("Engineer"),
       ("Scribe"),
       ("Marketing"),
       ("Accounting"),
       ("HRM");

/* === || ROLE ARRAY || === */
INSERT INTO roles (title, salary, department_id)
VALUES ("General Manager", 100000, 1),
       ("Lead Engineer", 200000, 2),
       ("Writer", 1000000, 3),
       ("Sales Manager", 500000, 4),
       ("Accountant", 1000000, 5),
       ("HRM", 1000000, 6);

/* === || EMPLOYEE ARRAY || === */
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Bill", "Murray", 2, 1),
       ("Tilda", "Swinton", 3, 1),
       ("Owen", "Wilson", 4, 1),
       ("Jeffrey", "Wright", 5, 1),
       ("Timothee", "Chalamet", 6, 1);

