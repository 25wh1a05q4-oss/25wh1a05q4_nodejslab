const express = require("express");

const app = express();

app.use(express.json());

let students = [
    {
        id: "5q4",
        name: "sahasra",
        age: 19
    },
    {
        id: 2,
        name: "kade",
        age: 24
    }
];

// Display all students
app.get("/", (req, res) => {
    res.json(students);
});

// Get all students
app.get("/students", (req, res) => {
    res.json(students);
});

// Add a new student
app.post("/students", (req, res) => {
    students.push(req.body);
    res.send("Student added successfully");
});

// Update a student
app.put("/students/:id", (req, res) => {
    const student = students.find(
        (s) => s.id == req.params.id
    );

    if (student) {
        student.name = req.body.name;
        student.age = req.body.age;

        res.send("Student updated successfully");
    } else {
        res.status(404).send("Student not found");
    }
});

// Delete a student
app.delete("/students/:id", (req, res) => {
    const student = students.find(
        (s) => s.id == req.params.id
    );

    if (student) {
        students = students.filter(
            (s) => s.id != req.params.id
        );

        res.send("Student deleted successfully");
    } else {
        res.status(404).send("Student not found");
    }
});

// Start the server
app.listen(3001, () => {
    console.log("Server running at http://localhost:3001");
});
