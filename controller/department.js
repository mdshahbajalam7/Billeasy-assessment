const express = require("express");
const database = require("../database");
const department = express();

department.get("/", (req, res) => {
  database.query("SELECT * FROM department ORDER BY name ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json(results.rows);
    }
  );
});

department.post("/create", (req, res) => {
  const { name } = req.body;
  let created_at = new Date();
  let updated_at = new Date();
  database.query('INSERT INTO department (name,created_at,updated_at) VALUES ($1,$2,$3) RETURNING *',[name,created_at,updated_at],(error, results) => {
      if (error) {
        throw error;
      }
      res
        .status(201)
        .send({ message: "Department created", 'Department': results.rows[0]});
    }
  );
});

module.exports = department;
