const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectToDB, Task } = require("./database");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// Define your routes here
app.post("/new", async (req, res) => {
    try {
        const { taskName, description, deadline } = req.body;
        const newTask = new Task({ taskName, description, deadline });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/tasks/today", async (req, res) => {
    try {
        const today = new Date("2024-05-03T07:00:00.000+00:00");
        const tasks = await Task.find({ deadline: {"$gte" : new Date("2024-05-03T07:00:00.000+00:00"), 
        "$lt" : new Date("2024-05-03T07:00:00.000+00:00")} });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/tasks/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const foundTask = await Task.findById(id);
        res.json(foundTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(id);
    res.send(deletedTask)
});

// Start the server
async function start() {
    await connectToDB();
    return app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}

if (require.main === module) {
    start().catch((err) => console.error(err));
}

module.exports = app;