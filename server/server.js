const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12762147",
  password: "yl4rafLbRm",
  database: "sql12762147",
});

// Connection to mysql Database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL database");
});

// Save favourites to the mysql database
app.post("/favorites", (req, res) => {
  const { id, title, year, type, poster } = req.body;
  console.log(id, title, year, type, poster);

  if (!id || !title || !year || !type || !poster) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = `
    INSERT INTO favorites (id, title, year, type, poster)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE id=id
  `;

  db.query(query, [id, title, year, type, poster], (err) => {
    if (err) {
      console.error("Error saving favorite:", err);
      return res.status(500).json({ error: "Failed to save favorite" });
    }
    res.status(201).json({ message: "Favorite saved successfully" });
  });
});

// get all favorites from mysql database
app.get("/favorites", (req, res) => {
  const query = "SELECT * FROM favorites";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving favorites:", err);
      return res.status(500).json({ error: "Failed to retrieve favorites" });
    }
    res.json(results);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
