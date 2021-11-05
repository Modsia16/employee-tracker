// Import and require mysql2
const mysql = require('mysql2');
//console table require
const inquirer = require('inquirer');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Gh1opera88!iaz',
    database: 'departments_db'
  },
);

db.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

//utilize package inquirer to prompt user
function start() {
  inquirer
    .prompt({ 
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        "View Employees",
        "View Departments",
        "View Roles",
        "Add Employee",
        "Add Department",
        "Add Role",
        "View Employee by Department",
        "Exit"]
      })
    .then(function(action) {
      switch (action.action) {
        case "View Employees":
          viewEmployees();
          break;
        case "View Departments":
          viewDepartments();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "View Employee by Department":
          viewEmployeeByDepartment();
          break;
        case "Exit":
          exit();
          break;
      }
    });
  }

