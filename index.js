const express = require("express");
const app = express();
const { UserModel, TodoModel } = require("./db");

app.get("/", function (req, res) {
  res.send("Home Page");
});

app.post("/signup", async function (req, res) {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  await UserModel.insert({
    email: email,
    name: name,
    password: password,
  });

  res.json({
    message: "You're signed up",
  });
});

app.post("/login", function (req, res) {});

app.post("/todo", function (req, res) {});

app.get("/todos", function (req, res) {});

app.listen(3000, function () {
  console.log("Server is live on PORT 3000");
});
