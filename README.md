# Employee Tracker - SQL

## Table of Contents

- [Objective](#objective)
- [Criteria](#criteria)
- [Install and Use](#install-and-use)
- [Project Process](#project-process)
- [Demo-link](#demo-link)

## Objective 

Create an interface (Content Management System aka CMS) that allows non-developers to easily view and ineract with information stored in databases. As a business owner I want them to be able to view and manage their departments, roles, and employees in their company so that they can organize and plan their business.

## Criteria
Given a command-line application that accepts user input, when I start the application, then I am presented with the following options: 
 - View all departments
 - View all roles, view all employees
 - Add a department
 - Add a role
 - Add an employee
 - Update an employee role 
When I choose to view all departments, then I am presented with a formatted table showing department names and department ids
When I choose to view all roles, then I am presented with the job title, role id, the department that role belongs to, and the salary for that role
When I choose to view all employees, then I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
When I choose to add a department, then I am prompted to enter the name of the department and that department is added to the database
When I choose to add a role, then I am prompted to enter the name, salary, and department for the role and that role is added to the database
When I choose to add an employee, then I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
When I choose to update an employee role, then I am prompted to select an employee to update and their new role and this information is updated in the database

## Install and Use 

You will need:
 - node.js
 - Inquirer
 - MySQL2
 - console.table

for your package.json

Run in the CLI and navigate through the desired criteria 
Preferred 
run npm i 
Mysql -u root -p
Source the ./db/schema.sql and seeds
run node server.js and scroll through what you would like to do

## Applicaton process

Set up the initial files for the server and db 
Create a package.json 
Schema and seeds files created for the database
Tested the source and is fuctional
Created fuctions for viewing employees, departments and roles
Created functions for adding employees, departments and roles
Created a function for updating an employee.
Created function for deleting roles, departments and employees

In general this project presented it's challenges, with some practice for the sql commands I 
got the functions to work in the CLI.

## Demo-link

![Screencastify link](https://watch.screencastify.com/v/CTjmq06VK7idPmCe6xBt)