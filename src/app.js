import { openDB } from "./configDB.js";
import { createTableUser, insertUser, updateUser, getUsers, getUserById, deleteUser, deleteTable } from "./Controller/User.js"

import express from "express";
const app = express();
app.use(express.json());

createTableUser();
//deleteTable();

app.get('/', function(req, res){
    res.send("Olá mundoo");
})

app.post('/createUser', function(req, res){
    insertUser(req.body);
    res.json({
        "statusCode": 200
    });
})

app.put('/updateUser', function(req, res){
    if(req.body && !req.body.id){
        res.json({
            "statusCode": "400",
            "msg": "É necessário informar um id"
        })
    }else{
        updateUser(req.body);
        res.json({
            "statusCode": 200
        });
    }

})

app.get('/getUsers', async function(req, res){
    let users = await getUsers();
    res.json(users);
})

app.get('/getUserById', async function(req, res){
    let user = await getUserById(req.body.id);
    res.json(user);
})

app.delete('/deleteUser', async function(req, res){
    let deletedUser = await deleteUser(req.body.id);
    res.json(deletedUser);
})

app.listen(3000, ()=> console.log("API rodando"))