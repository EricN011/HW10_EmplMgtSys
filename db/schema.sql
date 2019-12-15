DROP DATABASE IF EXISTS emplTracker_db;

CREATE DATABASE emplTracker_db;

USE emplTracker_db;

CREATE TABLE department
(
  id INT(10) NOT NULL
  AUTO_INCREMENT, 
	name VARCHAR
  (30) NOT NULL,
      PRIMARY KEY
  (id)
);

  CREATE TABLE role
  (
    id INT(20) NOT NULL
    AUTO_INCREMENT,
  title VARCHAR
    (30) NOT NULL,
  salary DECIMAL
    (10,2),
  department_id INT
    (10) NOT NULL,
  PRIMARY KEY
    (id)
);

    CREATE TABLE employee
    (
      id INT(20) NOT NULL
      AUTO_INCREMENT,
    firstname VARCHAR
      (30) NOT NULL,
    lastname VARCHAR
      (30) NOT NULL,
    role_id INT
      (10) NOT NULL,
    manager_id INT
      (10),
    PRIMARY KEY
      (id)
);

 