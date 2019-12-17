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
                newEmployee();
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
        };
    });
};

// Search for all employees
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

// Search for all employees based on their department
function emplDept() {
    inquirer.prompt({
        name: "deptChoice",
        type: "list",
        message: "Which family?",
        choices: [
            "Noll Family",
            "Moon Family"
        ]
    }).then(function (answer) {
        switch (answer.deptChoice) {
            case "Noll Family":
                deptChoice = "1";
                break;
            case "Moon Family":
                deptChoice = "2";
                break;

        }
        let data = [];
        let dept = deptChoice
        let query =
            "SELECT firstname, lastname, role.title, role.salary, department.name FROM department INNER JOIN role ON department.id = role.department_id INNER JOIN employee ON role.id = employee.role_id WHERE department.id = ?";
        connection.query(query, `${dept}`, (err, res) => {
            if (err) throw err;
            res.forEach(empl => {
                let emplInfo = [
                    `${empl.firstname} ${empl.lastname}`,
                    `${empl.title}`,
                    `$${empl.salary}.00`
                ];
                data.push(emplInfo);
            });
            console.table(["Name", "Role", "Worth"], data);
            startSearch();
        });
    });
};

// Search for all employees based on their manager
function emplMgr() {
    inquirer.prompt({
        name: "mgrChoice",
        type: "list",
        message: "Who does this person report to?",
        choices: [
            "Eric Noll",
            "Cody Moon",
            "Melissa Noll",
            "Konan Noll",
            "Cindy Moon",
            "Ashley Wilson"
        ]
    }).then(function (answer) {
        switch (answer.mgrChoice) {
            case "Eric Noll":
                mgrID = "1";
                break;
            case "Cody Moon":
                mgrID = "2";
                break;
            case "Melissa Noll":
                mgrID = "3";
                break;
            case "Konan Noll":
                mgrID = "5";
                break;
            case "Cindy Moon":
                mgrID = "7";
                break;
            case "Ashley Wilson":
                mgrID = "9";
                break;
        }
        let data = [];
        let manager = mgrID
        let query =
            "SELECT * FROM employee INNER JOIN role on role.id = employee.role_id WHERE manager_id = ?";
        connection.query(query, `${manager}`, (err, res) => {
            if (err) throw err;
            res.forEach(empl => {
                let emplInfo = [
                    `${empl.firstname} ${empl.lastname}`,
                    `${empl.title}`,
                    `$${empl.salary}.00`
                ];
                data.push(emplInfo);
            });
            console.table(["Name", "Role", "Worth", "Family"], data);
            startSearch();
        });
    });
};

function newEmployee() {
    inquirer.prompt({
        type: "confirm",
        name: "hasMgr",
        message: "Does this person report to anyone?",
        default: false
    }).then(answer => {
        if (answer.hasMgr) {
            createEmpl();
        } else {
            createMgr();
        }
    });
};

function deleteEmpl() {
    let query =
        "SELECT employee.id, employee.firstname, employee.lastname, role.title FROM employee INNER JOIN role ON role.id = employee.role_id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                name: "delete",
                message: "Select an Employee to delete from the system",
                choices: function () {
                    let emplNames = [];
                    res.forEach(employee => {
                        emplNames.push(
                            `${employee.firstname} ${employee.lastname}, ${employee.title}, ${employee.id}`
                        );
                    });
                    return emplNames;
                }
            }
        ]).then(answer => {
            let choice = answer.delete;
            let id = choice.match(/\d+/g);
            let query = "DELETE FROM employee WHERE id = ?";
            connection.query(query, id, (err, res) => {
                if (err) throw err;
                console.log("*****Employee deleted*****");
                startSearch();
            });
        });
    });
};
function updateRole() {
    let query =
        "SELECT employee.id, employee.firstname, employee.lastname, role.title FROM employee INNER JOIN role ON role.id = employee.role_id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                name: "updateRole",
                message: "Select an Employee to Update his or her Role",
                choices: function () {
                    let emplChoice = [];
                    res.forEach(employee => {
                        emplChoice.push(
                            `${employee.firstname} ${employee.lastname}, ${employee.title}, ${employee.id}`
                        );
                    });
                    return emplChoice;
                }
            },
            {
                type: "list",
                name: "role",
                message: "Select Role to update",
                choices: [
                    "Mother",
                    "Father",
                    "Sister",
                    "Brother",
                    "Sister in Law",
                    "Brother in Law",
                    "Father in Law",
                    "Mother in Law",
                    "Nephew",
                    "Neice",
                    "Dog",
                    "Cat"
                ]
            },
        ]).then(({ updateRole, role }) => {
            let update = updateRole;
            let id = update.match(/\d+/g);
            role === "Mother" ? (role = 3) :
                role === "Father" ? (role = 4) :
                    role === "Sister" ? (role = 11) :
                        role === "Brother" ? (role = 5) :
                            role === "Sister in Law" ? (role = 6) :
                                role === "Father in Law" ? (role = 8) :
                                    role === "Brother in Law" ? (role = 10) :
                                        role === "Nephew" ? (role = 12) :
                                            role === "Neice" ? (role = 13) :
                                                role === "Dog" ? (role = 14) :
                                                    (role = 15);

            console.log("Rank", id);
            console.log("Place in the Family", role);
            startSearch();
        });
    });
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

function createEmpl() {
    inquirer.prompt(
        [
            {
                type: "input",
                name: "firstName",
                message: "New Employee's first name?"
            },
            {
                type: "input",
                name: "lastName",
                message: "New Employee's last name?"
            },
            {
                type: "list",
                name: "role",
                message: "Select your place in the Family",
                choices: ["Mother", "Father", "Mother in Law", "Father in Law", "Sister", "Brother", "Sister in Law", "Brother in Law", "Neice", "Nephew", "Dog", "Cat"]
            },
            {
                type: "list",
                name: "mgrId",
                message: "Who do you report to?",
                choices: ["Noll Husband", "Moon Husband", "Mother", "Father", "Mother in Law", "Father in Law", "Dog", "Cat"]
            }]).then(({ firstName, lastName, role, mgrId }) => {
                // Roles
                (role === "Mother" ? (role = 3) :
                    role === "Father" ? (role = 4) :
                        role === "Sister" ? (role = 11) :
                            role === "Brother" ? (role = 5) :
                                role === "Sister in Law" ? (role = 6) :
                                    role === "Father in Law" ? (role = 8) :
                                        role === "Brother in Law" ? (role = 10) :
                                            role === "Nephew" ? (role = 12) :
                                                role === "Neice" ? (role = 13) :
                                                    role === "Dog" ? (role = 14) :
                                                        (role = 15));

                // manager IDs
                (mgrId === "Noll Husband" ? (mgrId = 2) :
                    mgrId === "Mother" ? (mgrId = 3) :
                        mgrId === "Father" ? (mgrId = 4) :
                            mgrId === "Mother in Law" ? (mgrId = 7) :
                                mgrId === "Father in Law" ? (mgrId = 8) :
                                    mgrId === "Dog" ? (mgrId = 14) :
                                        mgrId === "Cat" ? (mgrId = 15) :
                                            // Moon Husband
                                            (mgrId = 1));


                inputEmpl(firstName, lastName, role, mgrId);
            });
};
function inputEmpl(first, last, role, Id) {
    let query = "INSERT INTO employee SET ?";
    connection.query(
        query,
        {
            firstname: first,
            lastname: last,
            role_id: role,
            manager_id: Id
        },
        err => {
            if (err) throw err;
            console.log("*****New Employee Added*****");
            startSearch();
        }
    );
}

function createMgr() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "New Manager's first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "New Manager's last name?"
        },
        {
            type: "list",
            name: "role",
            message: "Select your place in the family",
            choices: ["Noll Husband", "Moon Husband", "Mother", "Father", "Mother in Law", "Father in Law", "Dog", "Cat"]
        }]).then(({ firstName, lastName, role }) => {
            role === "Noll Husband" ? (role = 1) :
                role === "Mother" ? (role = 3) :
                    role === "Father" ? (role = 4) :
                        role === "Mother in Law" ? (role = 7) :
                            role === "Father in Law" ? (role = 8) :
                                role === "Dog" ? (role = 14) :
                                    // Cat
                                    (role = 15);
            inputMgr(firstName, lastName, role);
        });
};
function inputMgr(first, last, role) {
    let query = "INSERT INTO employee SET ?";
    connection.query(
        query,
        {
            firstname: first,
            lastname: last,
            role_id: role,
        },
        err => {
            if (err) throw err;
            console.log("*****New Manager Added*****");
            startSearch();
        }
    );
}