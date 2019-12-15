// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");

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
        name: "search",
        type: "list",
        message: "What would you like to do?",
        choices:
            [
                "View ALL Employees",
                "View All Departments",
                "View All Roles",
                "Exit"
            ]
    }).then(function (answer) {
        console.log(answer)
        switch (answer.search) {
            case "View All Employees":
                emplSearch();
                break;
            case "View All Departments":
                deptSearch();
                break;
            case "View All Roles":
                roleSearch();
                break;
            case "Exit":
                connection.end();
                break;
        }
    });
}

function emplSearch() {
    let empl =
        "SELECT * FROM empltracker_db.employee";
    connection.query(empl, (err, res) => {
        if (err) throw err;
        console.log('in the employee')
    })
};

function deptSearch() {
    let dept =
        "SELECT * FROM empltracker_db.department";
    connection.query(dept, (err, res) => {
        if (err) throw err;
        console.table(res)
    })
};

function roleSearch() {
    let role =
        "SELECT * FROM empltracker_db.role";
    connection.query(role, (err, res) => {
        if (err) throw err;
        console.table(res)
    })
};