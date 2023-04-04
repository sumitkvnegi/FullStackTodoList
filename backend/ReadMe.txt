1. install depedencies required 
    dep-> express, mongoose 
    devdep-> dotenv

2. create files -> server.js, .env, .gitignore

3. In server file initiate the server and require the modules 
    const express = require("express");
    const mongoose = require("mongoose");
    const app = express();
    require('dotenv').config();
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => console.log(`server running at http://localhost:${PORT}`))

4. Next config the mongoose to connect node to database
    mongoose.connect(process.env.DATABASE_URL);
    const db = mongoose.connection;

    // Events
    db.on('error',(error)=>console.log(error)); 
    db.once('open',()=>console.log('Connected to database'));

5. set a build_in middleware , so that it can handle the data from the client as a json data
    app.use(express.json());

6. setting up a different file for the routes with simlar url /users
    const usersRouter = require('./routes/users');
    app.use('/users',usersRouter);

7. In routes folder , in users.js file create router
    const express = require("express");
    const router = express.Router();
    const User = require("../models/users");


    module.exports = router;

8.  we want these following routers:-
    // getting all users data 
    router.get('/',(req,res)=>{
        res.send('all users');
    })

    // create user
    router.post('/',(req,res)=>{

    })

    // get single user 
    router.get('/:id',(req,res)=>{
        res.send('single user');
    })

    // update user data
    router.patch('/:id',(req,res)=>{

    })

    // delete user
    router.delete('/:id',(req,res)=>{

    })

9. Now create folder models in this folder create a file users.js so that we can define the schema  (structure of document)

    const mongoose = require('mongoose');

    const usersSchema = new mongoose.Schema({
        name:{
            type: String,
            required: true
        },
        age:{
            type:Number,
            required: true
        }
    })

    module.exports = mongoose.model('User',usersSchema);

10. in routes file let set the first get method

    // Get All Users
    router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    });

    Test this route in tunder client

    // Create User
    router.post("/", async (req, res) => {
    const user = new User({
        name: req.body.name,
        age: req.body.age,
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    });

11. now create a middleware to find the user according to its id as client requested

    async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
        return res.status(404).json({ message: "Cannot find user" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
    }

12. now use the getUser middleware in our dynamic routes

    // Get User
    router.get("/:id", getUser, (req, res) => {
    res.json(res.user);
    });

    // Update User
    router.patch("/:id", getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name;
    }
    if (req.body.age != null) {
        res.user.age = req.body.age;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    });

    // Delete User
    router.delete("/:id", getUser, async (req, res) => {
    try {
        await res.user.deleteOne();
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    });