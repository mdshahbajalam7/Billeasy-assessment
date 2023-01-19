const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const employee = require("./controller");
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/",employee)

app.get("/", (req, res) => {
  res.send("hello")
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port http://localhost:${port}.`);
});
