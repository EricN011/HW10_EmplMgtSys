--  INSERT values into the department table
INSERT INTO department
    (name)
values
    ("Noll Family");
INSERT INTO department
    (name)
values
    ("Moon Family");
-- INSERT values into roles
-- CEOs
INSERT INTO role
    (title, salary, department_id)
values
    ("Moon Husband", 100000, 1);
INSERT INTO role
    (title, salary, department_id)
values
    ("Noll Husband", 100000, 2);
-- Noll Family roles
INSERT INTO role
    (title, salary, department_id)
values
    ("Mother", 50000, 1);
INSERT INTO role
    (title, salary, department_id)
values
    ("Father", 500000, 1);
INSERT INTO role
    (title, salary, department_id)
values
    ("Brother", 10000, 1);
INSERT INTO role
    (title, salary, department_id)
values
    ("Sister in Law", 5000, 1);
-- Moon Family roles
INSERT INTO role
    (title, salary, department_id)
values
    ("Mother in Law", 50000, 2);
INSERT INTO role
    (title, salary, department_id)
values
    ("Father in Law", 50000, 2);
INSERT INTO role
    (title, salary, department_id)
values
    ("Sister in Law", 10000, 2);
INSERT INTO role
    (title, salary, department_id)
values
    ("Brother in Law", 5000, 2);
INSERT INTO role
    (title, salary, department_id)
values
    ("Sister", 10000, 1);
INSERT INTO role
    (title, salary, department_id)
values
    ("Nephew", 10000, 2);
INSERT INTO role
    (title, salary, department_id)
values
    ("Neice", 10000, 2);
INSERT INTO role
    (title, salary, department_id)
values
    ("Dog", 100, 2);
INSERT INTO role
    (title, salary, department_id)
values
    ("Cat", 100, 1);

-- INSERT values into employees
-- CEOs
INSERT INTO employee
    (firstname, lastname, role_id)
values
    ("Eric", "Noll", 1);
INSERT INTO employee
    (firstname, lastname, role_id)
values
    ("Cody", "Moon", 2);
-- Noll Family Employees
INSERT INTO employee
    (firstname, lastname, role_id, manager_id)
values
    ("Melissa", "Noll", 3, 1);
INSERT INTO employee
    (firstname, lastname, role_id, manager_id)
values
    ("Kevin", "Noll", 4, 3);
INSERT INTO employee
    (firstname, lastname, role_id, manager_id)
values
    ("Konan", "Noll", 5, 3);
INSERT INTO employee
    (firstname, lastname, role_id, manager_id)
values
    ("Kimberly", "Noll", 6, 5);
-- Moon Family Employees
INSERT INTO employee
    (firstname, lastname, role_id, manager_id)
values
    ("Cindy", "Moon", 7, 2);
INSERT INTO employee
    (firstname, lastname, role_id, manager_id)
values
    ("Dale", "Moon", 8, 7);
INSERT INTO employee
    (firstname, lastname, role_id, manager_id)
values
    ("Ashley", "Wilson", 9, 2);
INSERT INTO employee
    (firstname, lastname, role_id, manager_id)
values
    ("Ethan", "Wilson", 10, 9);