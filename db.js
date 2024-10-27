const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
  username: String,
  age: Int32Array,
  password: String,
  name: String,
});

const Todo = new Schema({
  description: String,
  done: Boolean,
  userId: ObjectId,
});
