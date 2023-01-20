const express = require("express");
const database = require("../database");
const employee = express();


//Get employees by filter
employee.post("/search", (req, res) => {
  let { start, end, department } = req.body;
  let whereClouse = "";

  if (start && end) {
    whereClouse = `WHERE e.created_at BETWEEN '${start}' AND '${end}'`;
  }

  if (department && whereClouse.length === 0) {
    whereClouse = `WHERE d.name = '${department}'`;
  } else if (department && whereClouse.length > 0) {
    whereClouse = whereClouse + `AND d.name = '${department}'`;
  }

  let getQuery = `SELECT e.name, e.email, e.mobile, e.gender, d.name as department
  FROM employee e 
  LEFT JOIN department d ON e.department_id=d.id
  ${whereClouse}
  ORDER BY e.name ASC`;

  database.query(getQuery, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

//Create employee route
employee.post("/create", (req, res) => {
  const { name, email, gender, mobile, department } = req.body;

  // initializing the variables:
  let department_id = 1;
  let recordCount = 0;
  let created_at = new Date();
  let updated_at = new Date();

  // Trigger getter to get the record count of the employee data.
  database.query(
    "SELECT COUNT(employee.id) FROM employee",
    (error, results) => {
      if (error) {
        throw error;
      }
      recordCount = Number(results.rows[0].count);
    }
  );

  //Updating the department id from the department table for respective department
  database.query(
    `SELECT * FROM department WHERE name = '${department}'`,
    (error, results) => {
      if (error) {
        throw error;
      }
      department_id = Number(results.rows[0].id);
    }
  );

  
  // Creating a new employee in employee table
  database.query('INSERT INTO employee (name, email,gender, mobile,department_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5,$6, $7) RETURNING *',
   [name, email, gender, mobile, department_id, created_at, updated_at],
    (error, results) => {
      if (error) {
        throw error;
      }
      recordCount+=1
      res.status(201).send({message:"Employees created","Employee": results.rows[0],recordCount})
    }
  );
});

module.exports = employee;
