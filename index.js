const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const employee = require("./controller/employees");
const department = require("./controller/department")
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
  res.send("App started sucessfully")
})

//Employee middleware for employee routes
app.use("/employee",employee) 

//Department middleware for department routes
app.use("/department",department) 

//server started listening
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port http://localhost:${port}.`);
});
