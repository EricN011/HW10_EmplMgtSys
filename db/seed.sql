--  DELETE FROMes into the department table
DELETE FROM department
    (name)
values
("Noll Family");
DELETE FROM department
    (name)
values
("Moon Family");
-- DELETE FROMes into roles
-- CEOs
DELETE FROM role
    (title, salary, department_id)
values
("Moon Husband", 100000, 1);
DELETE FROM role
    (title, salary, department_id)
values
("Noll Husband", 100000, 2);
-- Noll Family roles
DELETE FROM role
    (title, salary, department_id)
values
("Mother", 50000, 1);
DELETE FROM role
    (title, salary, department_id)
values
("Father", 500000, 1);
DELETE FROM role
    (title, salary, department_id)
values
("Brother", 10000, 1);
DELETE FROM role
    (title, salary, department_id)
values
("Sister in Law", 5000, 1);
-- Moon Family roles
DELETE FROM role
    (title, salary, department_id)
values
("Mother in Law", 50000, 2);
DELETE FROM role
    (title, salary, department_id)
values
("Father in Law", 50000, 2);
DELETE FROM role
    (title, salary, department_id)
values
("Sister in Law", 10000, 2);
DELETE FROM role
    (title, salary, department_id)
values
("Brother in Law", 5000, 2);

-- DELETE FROMes into employees
-- CEOs
DELETE FROM employee
    (firstname, lastname, role_id)
values
("Eric", "Noll", 1);
DELETE FROM employee
    (firstname, lastname, role_id)
values
("Cody", "Moon", 2);
-- Noll Family Employees
DELETE FROM employee
    (firstname, lastname, role_id, manager_id)
values
("Melissa", "Noll", 3, 1);
DELETE FROM employee
    (firstname, lastname, role_id, manager_id)
values
("Kevin", "Noll", 4, 3);
DELETE FROM employee
    (firstname, lastname, role_id, manager_id)
values
("Konan", "Noll", 5, 3);
DELETE FROM employee
    (firstname, lastname, role_id, manager_id)
values
("Kimberly", "Noll", 6, 5);
-- Moon Family Employees
DELETE FROM employee
    (firstname, lastname, role_id, manager_id)
values
("Cindy", "Moon", 7, 2);
DELETE FROM employee
    (firstname, lastname, role_id, manager_id)
values
("Dale", "Moon", 8, 7);
DELETE FROM employee
    (firstname, lastname, role_id, manager_id)
values
("Ashley", "Wilson", 9, 2);
DELETE FROM employee
    (firstname, lastname, role_id, manager_id)
values
("Ethan", "Wilson", 10, 9);