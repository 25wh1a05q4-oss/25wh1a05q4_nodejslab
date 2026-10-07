const express = require("express");
const mysql = require("mysql2/promise");
const app=express();
app.use(express.json());
const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"25wh1a05q4"
});
db.getConnection().then((connection)=>{
    console.log("MySQL connected");
    connection.release();
})
.catch(error=>{
    console.log("MySQL connection failed:",error.message);
});
app.get("/",(req,res)=>{
    res.send("Welcome to student API");

});
app.get("/students",async(req,res)=>{
    try{
        const[rows] = await db.execute("SELECT * FROM students");
        res.json(rows);
    } catch (error) {
        res.send("Database error:"+error.message);
    }
});
app.post("/students",async(req,res)=>{
    try{
        const{name,roll_no}=req.body;
        await db.execute("INSERT INTO student(name,roll_no)VALUES(?,?)",
            [name,roll_no]
        );
        res.send("student added successfully");
    }catch(error){
        res.send("Database error:" +error.message);
    }
});
app.put("/students/:id",async(req,res)=>{
    try{
        const{name,roll_no}=req.body;
        await db.execute("UPDATE student SET name=?,roll_no? WHERE id=?",
            [name,rollno,req.params.id]
        );
        res.send("student updated successfully");

    } catch(error){
        res.send("Database error:"+error.message);
    }
});
app.delete("/students/:id",async(req,res)=>{
    try{
    
        await db.execute("DELETE FROM student WHERE id=?",
            [req.params.id]
        );
        res.send("student deleted successfully");

    } catch(error){
        res.send("Database error:"+error.message);
    }
});


app.listen(3000,()=>{
    console.log("server is running on port 3000");
});