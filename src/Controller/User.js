import { openDB } from "../configDB.js";
import { v4 as uuidv4 } from 'uuid';


export async function createTableUser(){
    openDB().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS User ( id UUID PRIMARY KEY UNIQUE, name TEXT, email TEXT UNIQUE, phone TEXT, address TEXT, password TEXT )');
    })
}

export async function insertUser(user){
    const uuid = uuidv4();
    openDB()
    .then(db=>{
        db.run('INSERT INTO User ( id, name, email, phone, address, password) VALUES (?, ?, ?, ?, ?, ?)', [uuid, user.name, user.email, user.phone, user.address, user.password])
    });
}

export async function updateUser(user){
    openDB()
    .then(db=>{
        db.run('UPDATE User SET name=?, email=?, phone=?, address=?, password=? WHERE  id=?', [user.name, user.email, user.phone, user.address, user.password, user.id])
    });
}

export async function getUsers(){
    return openDB()
    .then(db=>{
        return db.all('SELECT* FROM User')
        .then(res=>res)
    });
}

export async function getUserById(id){
    return openDB()
    .then(db=>{
        return db.all('SELECT* FROM User WHERE id=?', [id])
        .then(res=>res)
    });
}

export async function deleteUser(id){
    return openDB()
    .then(db=>{
        return db.all('DELETE* FROM User WHERE id=?', [id])
        .then(res=>res)
    });
}

export async function deleteTable(){
    openDB()
    .then(db=>{
        db.all('DROP TABLE IF EXISTS User')
    });
}

