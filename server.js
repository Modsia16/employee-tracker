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
async function start() {
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
        case "View Employee by Department":
          updateEmployeeByRole();
          break;
        case "Exit":
          exit();
          break;
      }
    });
  }

//create funcions to view tables
async function viewEmployees() {
  db.query(
    'SELECT * FROM employees',
    function(err, res) {
      if (err) throw err;
      console.table(res);
      start();
    }
  );
}

//view departments
async function viewDepartments() {
db.query
  (
    'SELECT * FROM department',
    function(err, res) {
      if (err) throw err;
      console.table(res);
      start();
    }
  );
}

//view roles
async function viewRoles() {
  db.query(
    'SELECT * FROM roles',
    function(err, res) {
      if (err) throw err;
      console.table(res);
      start();
    }
  );
}
//add functions

async function addEmployee() {
  db.query('SELECT * FROM roles', function(err, res) {
    if (err) throw err;
    const roles = res.map(role => {
      return {
        name: role.title,
        value: role.id
      }
    })
    inquirer
      .prompt([
        {
          name: 'first_name',
          type: 'input',
          message: 'What is the employee\'s first name?'
        },
        {
          name: 'last_name',
          type: 'input',
          message: 'What is the employee\'s last name?'
        },
        {
          name: 'role_id',
          type: 'input',
          message: 'What is the employee\'s role?',
          choices: roles
        },
        {
          name: 'manager_id',
          type: 'input',
          message: 'What is the employee\'s manager ID?'
        }
      ])
      .then(function(employee) {
        db.query(
          'INSERT INTO employees SET ?',
          {
            first_name: employee.first_name,
            last_name: employee.last_name,
            role_id: employee.role_id,
            manager_id: employee.manager_id
          },
          function(err, res) {
            if (err) throw err;
            console.log('Employee added successfully!');
            start();
          }
        );
      });
  });
}
  


async function addDepartment() {
inquirer 
  .prompt([
    {
      name: 'department_title',
      type: 'input',
      message: 'What is the department name?'
    }
  ])
  .then(function(department) {
    db.query(
      'INSERT INTO department SET ?',
      {
        name: department.department_title
      },
      function(err, res) {
        if (err) throw err;
        console.log('Department added successfully!');
        start();
      }
    );
  });
}

  async function addRole() {
  db.query('SELECT * FROM department', function(err, res) {
    if (err) throw err;
    const departments = res.map(department => {
      return {
        name: department.name,
        value: department.id
      }
    })
    inquirer
      .prompt([
        {
          name: 'title',
          type: 'input',
          message: 'What is the role title?'
        },
        {
          name: 'salary',
          type: 'input',
          message: 'What is the salary?'
        },
        {
          name: 'department_id',
          type: 'input',
          message: 'What is the department ID?',
          choices: departments
        }
      ])
      .then(function(role) {
        db.query(
          'INSERT INTO roles SET ?',
          {
            title: role.title,
            salary: role.salary,
            department_id: role.department_id
          },
          function(err, res) {
            if (err) throw err;
            console.log('Role added successfully!');
            start();
          }
        );
      });
  });
  }

async function viewEmployeeByDepartment() {
db.query(
  'SELECT * FROM department',
  function(err, res) {
    if (err) throw err;
    const departments = res.map(department => {
      return {
        name: department.name,
        value: department.title
      }
    })
    inquirer
      .prompt([
        {
          name: 'department_title',
          type: 'input',
          message: 'What is the department title?',
          choices: departments
        }
      ])
      .then(function(department) {
        db.query(
          'SELECT * FROM employees WHERE department_title = ?',
          department.department_title,
          function(err, res) {
            if (err) throw err;
            console.table(res);
            start();
          }
        );
      });
  });
}

async function updateEmployeeByRole() {
db.query(
  'SELECT * FROM roles',
  function(err, res) {
    if (err) throw err;
    const roles = res.map(role => {
      return {
        name: role.title,
        value: role.id
      }
    })
    inquirer
      .prompt([
        {
          name: 'role_id',
          type: 'input',
          message: 'What is the role ID?',
          choices: roles
        }
      ])
      .then(function(role) {
        db.query(
          'SELECT * FROM employees WHERE role_id = ?',
          role.role_id,
          function(err, res) {
            if (err) throw err;
            console.table(res);
            start();
          }
        );
      });
  });
}
  async function exit() {
    console.log('Goodbye!');
    process.exit();
  }

  start();