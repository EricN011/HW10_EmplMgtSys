DROP DATABASE IF EXISTS emplTracker_db;

CREATE DATABASE emplTracker_db;

USE emplTracker_db;

CREATE TABLE employees
(
  id INT NOT NULL
  AUTO_INCREMENT,
    firstname VARCHAR
  (30) NOT NULL,
    lastname VARCHAR
  (30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY
  (id)
);

  CREATE TABLE roles
  (
    id INT NOT NULL
    AUTO_INCREMENT,
  title VARCHAR
    (30) NOT NULL,
  salary DECIMAL
    (10,2) NULL,
  department_id INT NOT NULL,
  PRIMARY KEY
    (id)
);

    CREATE TABLE departments
    (
      id INT NOT NULL
      AUTO_INCREMENT, 
  name VARCHAR
      (30),
);

      INSERT INTO employees
        (firstname, lastname, role_id, manager_id)
      values
        ();
      INSERT INTO employees
        (firstname, lastname, role_id, manager_id)
      values
        ();
      INSERT INTO employees
        (firstname, lastname, role_id, manager_id)
      values
        ();
      INSERT INTO employees
        (firstname, lastname, role_id, manager_id)
      values
        ();

      INSERT INTO roles
        (id, title, salary, department_id)
      values
        ();

      INSERT INTO departments
        (id)
      values
        ();