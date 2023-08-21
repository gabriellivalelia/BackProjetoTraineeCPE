import { openDB } from "../configDB.js";
import { v4 as uuidv4 } from "uuid";

export async function createTableUser(req, res) {
  const db = await openDB();

  db.exec(
    "CREATE TABLE IF NOT EXISTS User ( id UUID PRIMARY KEY UNIQUE NOT NULL, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, phone TEXT NOT NULL, address TEXT NOT NULL, password TEXT NOT NULL )"
  );
}

export async function createUser(req, res) {
  const userData = req.body;
  const uuid = uuidv4();
  const db = await openDB();

  return db.run(
    "INSERT INTO User ( id, name, email, phone, address, password) VALUES (?, ?, ?, ?, ?, ?)",
    [
      uuid,
      userData.name,
      userData.email,
      userData.phone,
      userData.address,
      userData.password,
    ]
  );
}

export async function updateUser(req, res) {
  const user = req.body; // Recebe o objeto de usuário do corpo da solicitação
  const db = await openDB(); // Abre a conexão com o banco de dados

  // Construir a consulta SQL apenas com os campos modificados
  let updateQuery = "UPDATE User SET ";
  const updateParams = [];
  const fieldsToUpdate = ["name", "email", "phone", "address", "password"];

  // Loop pelos campos que podem ser atualizados
  fieldsToUpdate.forEach((field) => {
    if (user[field] !== undefined) {
      updateQuery += `${field}=?, `; // Adiciona o campo à consulta SQL
      updateParams.push(user[field]); // Adiciona o valor do campo aos parâmetros da consulta
    }
  });

  // Remover a vírgula final da consulta
  updateQuery = updateQuery.slice(0, -2);

  // Adicionar a cláusula WHERE para o ID
  updateQuery += " WHERE id=?"; // Adiciona a cláusula WHERE com o ID do usuário
  updateParams.push(user.id); // Adiciona o ID do usuário aos parâmetros da consulta

  // Executa a consulta SQL de atualização com os parâmetros fornecidos
  db.run(updateQuery, updateParams);
}

export async function getUsers(req, res) {
  const db = await openDB();

  return db.all("SELECT* FROM User");
}

export async function getUserById(req, res) {
  const db = await openDB();
  const id = req.params.id;

  const [user] = await db.all("SELECT* FROM User WHERE id=?", [id]);
  return user;
}

export async function getUserByEmail(email) {
  const db = await openDB();
  const [user] = await db.all("SELECT * FROM User WHERE email=?", [email]);

  return user;
}

export async function deleteUser(req, res) {
  let id = req.body.id;
  const db = await openDB();

  db.all("DELETE FROM User WHERE id=?", [id]);
}

export async function deleteTable(req, res) {
  const db = await openDB();

  db.all("DROP TABLE IF EXISTS User");
}
