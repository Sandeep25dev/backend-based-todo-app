const express = require("express");
const app = express();
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, auth } = require("./auth");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://sandeepkumar250903:sandip10@cluster0.ptlwf.mongodb.net/todo-app-database"
);

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Home Page");
});

app.post("/signup", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  await UserModel.create({
    email: email,
    password: password,
    name: name,
  });

  res.json({
    message: "You are signed up",
  });
});

app.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  try {
    // UserModel is reffered to the users collection in  our database
    const response = await UserModel.findOne({
      email: email,
      password: password,
    });

    if (response) {
      const token = jwt.sign(
        {
          id: response._id.toString(),
        },
        JWT_SECRET
      );

      res.json({
        token: token,
      });
    } else {
      res.status(403).json({
        message: "Incorrect Credentials",
      });
    }
  } catch (err) {
    console.error(err);
  }
});

app.post("/todo", auth, function (req, res) {});

app.get("/todos", auth, function (req, res) {});

app.listen(3003, function () {
  console.log("Server is live on PORT 3003");
});
