const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db");
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

//create a task
app.post("/tasks", async(req, res) => {
    try {
        const { description } = req.body
        const newTask = await pool.query (
            'INSERT INTO tasks (description) VALUES($1) RETURNING *',
            [description]
        );

    res.json(newTask.rows[0])
    } catch (err) {
        console.error(err.message);
    }
});


//Get all tasks
app.get("/tasks", async(req, res) => {
    try {
        const allTasks = await pool.query (
            "SELECT * FROM tasks"
        );
        res.json(allTasks.rows);
    } catch (err) {
        console.error(err.message);
    }
});


//Get a task
app.get("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const task = await pool.query (
            "SELECT * FROM tasks WHERE task_id = $1",
            [id]
        );
        res.json(task.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});


//Update a task
app.put("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTask = await pool.query (
            "UPDATE tasks SET description = $1 WHERE task_id = $2",
            [description, id]
        );
        res.json("Task updated");
    } catch (err) {
        console.error(err.message);
    }
});


//Delete a task
app.delete("/tasks/:id", async (req, res) =>{
    try {
        const { id } = req.params;
        const deleteTask = await pool.query (
            "DELETE FROM tasks WHERE task_id = $1",
            [id]
        );
        res.json("Task deleted");
    } catch (err) {
        console.error(err.message);
    }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));