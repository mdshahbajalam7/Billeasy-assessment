const express = require("express");
const database = require("./database");
const employee = express();

employee.get("/employees", (req, res) => {
  database.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

module.exports = employee;
