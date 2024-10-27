const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Home Page");
});

app.post("/signup", function (req, res) {});

app.post("/login", function (req, res) {});

app.post("/todo", function (req, res) {});

app.get("/todos", function (req, res) {});

app.listen(3000, function () {
  console.log("Server is live on PORT 3000");
});
