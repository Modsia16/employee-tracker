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
  console.log(`Connected to the departments_db database.`)
);

// Query database
db.query('SELECT * FROM department_titles', function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});