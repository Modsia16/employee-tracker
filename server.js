// Import and require mysql2
const mysql = require('mysql2');
//console table require
const inquirer = require('inquirer');
const consoleTable = require("console.table");

// Connect to database
const db = mysql.createConnection(
  {
    multipleStatements: true,
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Gh1opera88!iaz',
    database: 'departments_db',
  },
);
exports.db = db;

db.connect((err) => {
    if (err)
      throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });

//utilize package inquirer to prompt user
const start = () => {
 return inquirer.prompt({ 
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
        "Update Employee Role",
        "Delete Employee",
        "Delete Department",
        "Delete Role",
        "Exit"]
      })
    .then((answer) => {
      switch (answer.action) {
        case "View Employees":
          viewEmployees();
          break;
        case "View Departments":
          viewDepartment();
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
        case "Update Employee Role":
          updateEmployeeByRole();
          break;
        case "Delete Employee":
          deleteEmployee();
          break;
        case "Delete Department":
          deleteDepartment();
          break;
        case "Delete Role":
          deleteRole();
          break;
        case "Exit":
          db.end();
      };
    });
  };

//create funcions to view tables
const viewEmployees = () => {
  const sch = `SELECT employees.id,
  employees.first_name,
  employees.last_name,
  roles.title,
  departments.department_title,
  roles.salary
  FROM employees, roles, departments
  WHERE departments.id = roles.department_id
  AND roles.id = employees.role_id`;
  db.query(sch, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

// //view departments
const viewDepartment = () => {
  const sch = `SELECT departments.id AS id, 
  departments.department_title AS departments 
  FROM departments`;
  db.query(sch, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

// //view roles
const viewRoles = () => {
  const sch = `SELECT roles.id, roles.title,
  roles.salary, departments.department_title
  AS departments FROM roles INNER JOIN departments ON roles.department_id = departments.id`;
  db.query(sch, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};
;

//add employee
const addEmployee = async () => {
  const answer = await inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: 'What is the employee first name?',
        validate: fsName_1 => {
          if (fsName_1) {
            return true;
          } else {
            console.log('Please enter a first name');
            return false;
          }
        }
      },
      {
        name: 'last_name',
        type: 'input',
        message: 'What is the employee last name?',
        validate: lsName_1 => {
          if (lsName_1) {
            return true;
          } else {
            console.log('Please enter a last name');
            return false;
          }
        }
      },
    ]);
  const sqll = [answer.first_name, answer.last_name];
  const roleseq = `SELECT roles.id, roles.title FROM roles`;
  db.query(roleseq, (err, res) => {
    if (err)
      throw err;
    const roles = res.map(({ id, title }) => ({ name: title, value: id }));
    inquirer.prompt([
      {
        name: 'role_id',
        type: 'list',
        message: 'What is the employee role?',
        choices: roles
      }
    ])
      .then(roleOpt => {
        const role = roleOpt.role;
        sqll.push(role);
        const mgrSec = `SELECT * FROM employees`;
        db.query(mgrSec, (err_1, res_1) => {
          if (err_1)
            throw (err_1);
          const mgrOpt = res_1.map(({ id: id_1, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id_1 }));
          inquirer.prompt([
            {
              type: 'list',
              name: 'manager',
              message: "Who is the employee's manager?",
              choices: mgrOpt
            }
          ])
            .then(mgr => {
              sqll.push(mgr.manager);
              const sch = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
              db.query(sch, sqll, (err_2, res_2) => {
                if (err_2)
                  throw err_2;
                console.log(`${answer.first_name} ${answer.last_name} has been added to the database`);
                start();
              });
            });
        });
      });
  });
};

async function addDepartment() {
  const answer = await inquirer
    .prompt([
      {
        name: 'department_title',
        type: 'input',
        message: 'What is the department title?',
        validate: dt => {
          if (dt) {
            return true;
          } else {
            console.log('Please enter a department title');
            return false;
          }
        }
      },
    ]).then(answer => {
      const sch = `INSERT INTO departments (department_title) VALUES (?)`;
      db.query(sch, answer.department_title, (err, res) => {
        if (err)
          throw err;
        console.log(`${answer.department_title} has been added to the database`);
        start();
      });
    });
};

async function addRole() {
  const answer = await inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: 'What is the role title?',
        validate: title => {
          if (title) {
            return true;
          } else {
            console.log('Please enter a role title');
            return false;
          }
        }
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the role salary?',
        validate: salary => {
          if (salary) {
            return true;
          } else {
            console.log('Please enter a role salary');
            return false;
          }
        }
      },
      {
        name: 'department',
        type: 'input',
        message: 'What is the role department?',
        validate: department => {
          if (department) {
            return true;
          } else {
            console.log('Please enter a role department number');
            return false;
          }
        }
      },
    ]).then(answer => {
      const sch = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
      db.query(sch, [answer.title, answer.salary, answer.department], (err, res) => {
        if (err)

          throw err;
        console.log(`${answer.title} has been added to the database`);
        start();
      });
    });
};

const updateEmployeeByRole = () => {
  let sch = `SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id FROM employees`;
  db.query(sch, (err, res) => {
    if (err) throw err; 
    const emp = res.map(({id, first_name, last_name}) => ({name: first_name + " " + last_name, value: id}));
      inquirer.prompt([
          {
              type: 'list',
              name: 'chooseEmployee',
              message: "Which employee has a new manager?",
              choices: emp
          },
          {
              type: 'list',
              name: 'newManager',
              message: "Who is their manager?",
              choices: emp
          }
      ])
      .then((answer) => {
        const sch = `UPDATE employees SET manager_id = ? WHERE id = ?`;
        db.query(sch, [answer.newManager, answer.chooseEmployee], (err, res) => {
          if (err) throw err;
          console.log(`${answer.chooseEmployee}'s manager has been updated`);
          start();
      });
  });
});
}

async function deleteDepartment() {
  const answer = await inquirer
    .prompt([
      {
        name: 'department',
        type: 'input',
        message: 'What is the department number?',
        validate: department => {
          if (department) {
            return true;
          } else {
            console.log('Please enter a department number');
            return false;
          }
        }
      },
    ]).then(answer => {
      const sch = `DELETE FROM departments WHERE id = ?`;
      db.query(sch, answer.department, (err, res) => {
        if (err) throw err;
        console.log(`Department ${answer.department} has been deleted`);
        start();
      });
    });
};

async function deleteRole() {
  const answer = await inquirer
    .prompt([
      {
        name: 'role',
        type: 'input',
        message: 'What is the role number?',
        validate: role => {
          if (role) {
            return true;
          } else {
            console.log('Please enter a role number');
            return false;
          }
        }
      },
    ]).then(answer => {
      const sch = `DELETE FROM roles WHERE id = ?`;
      db.query(sch, answer.role, (err, res) => {
        if (err) throw err;
        console.log(`Role ${answer.role} has been deleted`);
        start();
      });
    });
};

async function deleteEmployee() {
  const answer = await inquirer
    .prompt([
      {
        name: 'employee',
        type: 'input',
        message: 'What is the employee id?',
        validate: employee => {
          if (employee) {
            return true;
          } else {
            console.log('Please enter an employee id');
            return false;
          }
        }
      },
    ]).then(answer => {
      const sch = `DELETE FROM employees WHERE id = ?`;
      db.query(sch, answer.employee, (err, res) => {
        if (err) throw err;
        console.log(`${answer.employee} has been terminated`);
        start();
      });
    });
}


