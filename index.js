const express = require("express");
const app = express();
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const auth = require("./auth");
const { JWT_SECRET, mongoDB_URL } = require("./config");
const mongoose = require("mongoose");
mongoose.connect(mongoDB_URL);

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
    const user = await UserModel.findOne({
      email: email,
      password: password,
    });

    console.log(user);

    if (user) {
      const token = jwt.sign(
        {
          id: user._id.toString(),
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
