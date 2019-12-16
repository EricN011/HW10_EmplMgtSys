// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require('console.table');

// Creating Connection to mysql database
const connection = mysql.createConnection({
    host: "localhost",
    //port; if not 3306
    port: 3306,
    //username
    user: "root",
    //password
    password: "blank",
    // database
    database: "empltracker_db"
});
connection.connect(err => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    startSearch();
});

// load prompts (main menu)
function startSearch() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices:
            [
                "View All Employees",
                "View All Employees by Department",
                "View All Employees by Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "View All Roles",
                "Add Role",
                "Remove Role",
                "Exit"
            ]
    }).then(function (answer) {
        switch (answer.action) {
            case "View All Employees":
                emplAll();
                break;
            case "View All Employees by Department":
                emplDept();
                break;
            case "View All Employees by Manager":
                emplMgr();
                break;
            case "Add Employee":
                addEmpl();
                break;
            case "Remove Employee":
                deleteEmpl();
                break;
            case "Update Employee Role":
                updateRole();
                break;
            case "Update Employee Manager":
                updateMgr();
                break;
            case "View All Roles":
                roleAll();
                break;
            case "Add Role":
                addRole();
                break;
            case "Remove Role":
                deleteRole();
                break;
            case "Exit":
                connection.end();
                break;
        }
    });
}

function emplAll() {
    let data = [];
    let query =
        "SELECT firstname, lastname, role.title, role.salary, department.name FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        res.forEach(empl => {
            let emplInfo = [
                `${empl.firstname} ${empl.lastname}`,
                empl.title,
                `$${empl.salary}.00`,
                empl.name
            ];
            data.push(emplInfo);
        });
        console.table(["Name", "Role", "Worth", "Family"], data);
        startSearch();
    });
};

function emplDept() {

};
function emplMgr() {

};
function addEmpl() {

};
function deleteEmpl() {

};
function updateRole() {

};
function updateMgr() {

};

function roleAll() {
    let data = [];
    let query =
        "SELECT title, role.salary, department.name FROM role INNER JOIN employee ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        res.forEach(role => {
            let roleInfo = [
                role.title,
                `$${role.salary}.00`,
                role.name
            ];
            data.push(roleInfo);
        });
        console.table(["Title", "Worth", "Family"], data);
        startSearch();
    });
};

function addRole() {

};
function deleteRole() {

};