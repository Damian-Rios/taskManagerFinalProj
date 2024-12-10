const express = require("express");
const app = express();

const { mongoose } = require("./db/mongoose");

const bodyParser = require("body-parser");

// mongoose models
const { List, Task } = require("./db/models/");

// Middleware
app.use(bodyParser.json());

// CORS Headers Middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* Route Handlers */

/* List Routes */
/* GET /lists  to get all lists */
app.get("/lists", (req, res) => {
    // Return an array of all the lists in the database
    List.find({}).then((lists) => {
        res.send(lists);
    });
});

/* POST /lists  to create a list */
app.post("/lists", (req, res) => {
    // Create a new list and return the new list document back to the user
    let title = req.body.title;

    let newList = new List({
        title
    });
    newList.save().then((listDoc) => {
        res.send(listDoc);
    });
});

/* PATH /lists/:id to update a list */
app.patch("/lists/:id", (req, res) => {
    // Update specified list with given id
    List.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
});

/* Delete /lists/:id to delete a list */
app.delete("/lists/:id", (req, res) => {
    // Delete specified list with given id
    List.findOneAndDelete({
        _id: req.params.id,
    }).then((removedListDoc) => {
        res.send(removedListDoc);
    });
});

/* Task Routes */
/* GET /lists/:listId/tasks  to get all tasks in a list */
app.get("/lists/:listId/tasks", (req, res) => {
    // Return all tasks belonging to specified list
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    });
});

/* POST /lists/:listId/tasks  to create a task in a list */
app.post("/lists/:listId/tasks", (req,res) => {
    // Create a new task in the specified list
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc);
    });
});

/* PATCH /lists/:listId/tasks/:taskId  to update a task in a list */
app.patch("/lists/:listId/tasks/:taskId", (req, res) => {
    // Update a task in the specified list
    Task.findOneAndUpdate({ 
        _id: req.params.taskId,
        _listId: req.params.listId
     }, {
            $set: req.body
        }
     ).then(() => {
        res.sendStatus(200);
     });
});

/* PATCH /lists/:listId/tasks/:taskId  to delete a task in a list */
app.delete("/lists/:listId/tasks/:taskId", (req, res) => {
    // Delete a task in the specified list
    Task.findOneAndDelete({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTaskDoc) => {
        res.send(removedTaskDoc);
    });
});






app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});