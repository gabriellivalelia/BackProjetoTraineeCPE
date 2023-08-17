import { openDB } from "../configDB.js";
import { v4 as uuidv4 } from 'uuid';


export async function createTableUser(req,res){
    openDB().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS User ( id UUID PRIMARY KEY UNIQUE NOT NULL, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, phone TEXT NOT NULL, address TEXT NOT NULL, password TEXT NOT NULL )');
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
}

export async function getUsers(req,res){
    return openDB()
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

export async function getUserByEmail(email){
    const db = await openDB();
    const [user] = await db.all('SELECT * FROM User WHERE email=?', [email]);

    return user;
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
}

