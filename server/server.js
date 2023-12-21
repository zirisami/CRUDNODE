import mysql from 'mysql';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Azerty@@123",
    database: 'centre_formation'
});



app.get('/' , (req , res) => {
    const sql = "SELECT * FROM students";
    db.query(sql, (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    } )
})

app.post('/student' ,(req, res)=> {
    const sql = "INSERT INTO students (`nom` , `email`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email
    ]
    db.query(sql, [values], (err, result)=> {
        if(err) return res.json(err);
        return res.json(result);
    })
        
})

app.get('/read/:id' , (req , res) => {
    const sql = "SELECT * FROM students WHERE ID = ?";
    const id = req.params.id;

    db.query(sql,[id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.put('/update/:id', (req, res) => {
    const sql ='UPDATE students SET `nom`= ?, `email`=? WHERE id=?;';
    const id = req.params.id;

    db.query(sql , [req.body.name , req.body.email, id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.delete('/delete/:id' , (req, res) => {
    const sql = "DELETE FROM `students` WHERE `id` = ?"
    const id = req.params.id;
    db.query(sql , [id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
