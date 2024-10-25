const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db");
const PORT = process.env.PORT || 3000;
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

    // res.json(newTask.row[1])
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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));