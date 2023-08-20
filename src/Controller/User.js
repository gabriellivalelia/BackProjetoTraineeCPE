import { openDB } from "../configDB.js";
import { v4 as uuidv4 } from 'uuid';


export async function createTableUser(req,res){
    openDB().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS User ( id UUID PRIMARY KEY UNIQUE NOT NULL, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, phone TEXT NOT NULL, address TEXT NOT NULL, password TEXT NOT NULL )');
    });
}

export async function createUser(req,res){
    try {
      let user = req.body;
      const uuid = uuidv4();
      const db = await openDB();
    
      const { userRes } = await db.run('INSERT INTO User ( id, name, email, phone, address, password) VALUES (?, ?, ?, ?, ?, ?)', [uuid, user.name, user.email, user.phone, user.address, user.password])
    
      return userRes;
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function updateUser(req, res) {
    try {
        const user = req.body; // Recebe o objeto de usuário do corpo da solicitação
        const db = await openDB(); // Abre a conexão com o banco de dados

        // Construir a consulta SQL apenas com os campos modificados
        let updateQuery = 'UPDATE User SET ';
        const updateParams = [];
        const fieldsToUpdate = ['name', 'email', 'phone', 'address', 'password'];

        // Loop pelos campos que podem ser atualizados
        fieldsToUpdate.forEach(field => {
            if (user[field] !== undefined) {
                updateQuery += `${field}=?, `; // Adiciona o campo à consulta SQL
                updateParams.push(user[field]); // Adiciona o valor do campo aos parâmetros da consulta
            }
        });

        // Remover a vírgula final da consulta
        updateQuery = updateQuery.slice(0, -2);

        // Adicionar a cláusula WHERE para o ID
        updateQuery += ' WHERE id=?'; // Adiciona a cláusula WHERE com o ID do usuário
        updateParams.push(user.id); // Adiciona o ID do usuário aos parâmetros da consulta

        // Executa a consulta SQL de atualização com os parâmetros fornecidos
        await db.run(updateQuery, updateParams);

        // Responde com um status de sucesso
        res.json({
            "statusCode": 200
        });
    } catch (error) {
        // Em caso de erro, registra o erro no console e responde com um erro interno do servidor
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}



export async function getUsers(req,res){
    try {
      const db = await openDB();
      
      const { users } = await db.all('SELECT* FROM User').then(users=>res.json(users));

      return users;
        
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function getUserById(req,res){
    try {
        let id = req.body.id;
        const db = await openDB();

        const { user } = db.all('SELECT* FROM User WHERE id=?', [id])
        .then(user=>res.json(user));

        return user;
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function getUserByEmail(email){
    try {
        const db = await openDB();
        const [user] = await db.all('SELECT * FROM User WHERE email=?', [email]);
    
        return user; 
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" }); 
    }
    
}

export async function deleteUser(req,res){
    try {
        let id = req.body.id;
        const db = await openDB();
        await db.all('DELETE FROM User WHERE id=?', [id]);

        res.json({
            "statusCode": 200
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });  
    }
    
}

export async function deleteTable(req,res){
    openDB()
    .then(db=>{
        db.all('DROP TABLE IF EXISTS User')
    });
}

