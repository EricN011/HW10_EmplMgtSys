// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

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
    database: "emplTracker_db"
});
connection.connect(err => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.end();
});

// load prompts (main menu)
function loadPrompts() {
    inquirer.prompt([{
        type: "list",
        name: "names",
        choices: ["View Employees", "Add Employee"],
        message: "What would you like to do?"
    }]).then(function (answer) {
        if (answer.names === "View Employees") {
            viewEmployees()
        } else {
            addEmployee()
        }
    })


    // view employees
    // view employees by dept
}

// if statement to call choice above
function viewEmployees() {
    // query the dp for what they need
    SELECT * from employees allEmployees =>
        console.table(allEmployees)
    loadPrompts();
}

function addEmployee() {
    findAllRoles.then() {
        const roleid = inquirer.prompt();
        findAllEmployees.then() {
            const managerid = prompt
            query to add employee to table
        }
    }
}