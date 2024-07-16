// import mongoose
const mongoose = require('mongoose');

// Connection String from MongoDB Atlas
const dbConnectionUri = "mongodb+srv://jtao25:NZ1cgIDZpdIRdHvI@cluster0.9nmidw4.mongodb.net";
const dbName = "task-bank";

const taskSchema = new mongoose.Schema({
    taskName: String,
    description: String,
    deadline: Date
});

const Task = mongoose.model('Task', taskSchema);

async function connectToDB() {
    await mongoose.connect(dbConnectionUri, { dbName });
    console.log("Succesfully connected to MongoDB");
}

module.exports = { connectToDB, Task};

