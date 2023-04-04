const express = require("express");
const router = express.Router();
const Task = require("../models/tasks");

// Get All Tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create Task
router.post("/", async (req, res) => {
  const task = new Task({
    input: req.body.input,
    completed: req.body.completed,
    col: req.body.col
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get Task
router.get("/:id", getTask, (req, res) => {
  res.json(res.task);
});

// Update Task
router.patch("/:id", getTask, async (req, res) => {
  if (req.body.input != null) {
    res.task.input = req.body.input;
  }
  if (req.body.completed != null) {
    res.task.completed = req.body.completed;
  }
  try {
    const updatedTask = await res.task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Task
router.delete("/:id", getTask, async (req, res) => {
  try {
    await res.task.deleteOne();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getTask(req, res, next) {
  let task;
  try {
    task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.task = task;
  next();
}

module.exports = router;
