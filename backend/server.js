const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(cors());

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on('error',(error)=>console.log(error));
db.once('open',()=>console.log('Connected to database'));

app.use(express.json());

const tasksRouter = require('./routes/tasks');
app.use('/tasks',tasksRouter);

app.listen(PORT, () => console.log(`server running at http://localhost:${PORT}`))