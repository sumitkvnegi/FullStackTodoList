const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
  input: [
    { type: String, required: true },
    { type: String, required: true },
  ],
  completed: {
    type: Boolean,
    required: true,
  },
  col:{
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Task", tasksSchema);
