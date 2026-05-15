//const express = require("express");

//const app = express();

// app.get("/", (req, res) => {
//   res.send("Node is running under IIS ✔");
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log("Server started");
// });

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "10.0.4.4",
  user: "mysqladmin",
  password: "Budwiser@12345",
  database: "appdb"
});

db.connect((err) => {
  if (err) {
    console.log("DB Connection Failed");
  } else {
    console.log("Connected to MySQL");
  }
});

app.get("/", (req, res) => {
  res.send(`
    <h2>Employee Request Portal</h2>

    <form method="POST" action="/submit">
      Name:<br>
      <input type="text" name="name"><br><br>

      Department:<br>
      <input type="text" name="department"><br><br>

      Project:<br>
      <input type="text" name="project"><br><br>

      <button type="submit">Submit</button>
    </form>
  `);
});

app.post("/submit", (req, res) => {
  const { name, department, project } = req.body;

  const sql = `
    INSERT INTO employee_requests
    (employee_name, department, project_name, request_status)
    VALUES (?, ?, ?, 'Submitted')
  `;

  db.query(sql, [name, department, project], (err, result) => {
    if (err) {
      res.send("Error inserting data");
    } else {
      res.send("Request submitted successfully!");
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started on port 3000");
});
