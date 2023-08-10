import { openDB } from "../configDB.js";
import { v4 as uuidv4 } from 'uuid';


export async function createTableUser(req,res){
    openDB().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS User ( id UUID PRIMARY KEY UNIQUE, name TEXT, email TEXT UNIQUE, phone TEXT, address TEXT, password TEXT )');
    });
    res.json({
        "statusCode": 200
    });
}

export async function createUser(req,res){
    let user = req.body;
    const uuid = uuidv4();
    openDB()
    .then(db=>{
        db.run('INSERT INTO User ( id, name, email, phone, address, password) VALUES (?, ?, ?, ?, ?, ?)', [uuid, user.name, user.email, user.phone, user.address, user.password])
    });
    res.json({
        "statusCode": 200
    });
}

export async function updateUser(req,res){
    let user = req.body;
    openDB()
    .then(db=>{
        db.run('UPDATE User SET name=?, email=?, phone=?, address=?, password=? WHERE  id=?', [user.name, user.email, user.phone, user.address, user.password, user.id])
    });
    res.json({
        "statusCode": 200
    });
}

export async function getUsers(req,res){
    openDB()
    .then(db=>{
        return db.all('SELECT* FROM User')
        .then(users=>res.json(users))
    });
}

export async function getUserById(req,res){
    let id = req.body.id;
    return openDB()
    .then(db=>{
        return db.all('SELECT* FROM User WHERE id=?', [id])
        .then(user=>res.json(user))
    }); 
}

export async function deleteUser(req,res){
    let id = req.body.id;
    openDB()
    .then(db=>{
        db.all('DELETE FROM User WHERE id=?', [id])
    });
    res.json({
        "statusCode": 200
    });
}

export async function deleteTable(req,res){
    openDB()
    .then(db=>{
        db.all('DROP TABLE IF EXISTS User')
    });
    res.json({
        "statusCode": 200
    });
}
