const express = require("express");
const app = express();
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { auth } = require("./auth");
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

  const hashedPassword = await bcrypt.hash(password, 5);

  await UserModel.create({
    email: email,
    password: hashedPassword,
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
    });

    if (!user) {
      res.status(403).json({
        message: "user not found",
      });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
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

app.post("/todo", auth, async function (req, res) {
  const userId = req.userId;
  const description = req.body.description;
  const done = req.body.done;

  await TodoModel.create({
    description,
    done,
    userId,
  });

  res.json({
    message: "Todo added to the DB",
  });
});

app.get("/todos", auth, async function (req, res) {
  const userId = req.userId;
  const todos = await TodoModel.find({
    userId: userId,
  });
  if (todos) {
    res.json({
      todos,
    });
  } else {
    res.json({
      message: "No todos found for this user",
    });
  }
});

app.listen(3003, function () {
  console.log("Server is live on PORT 3003");
});
