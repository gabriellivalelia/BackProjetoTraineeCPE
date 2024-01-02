import { openDB } from "../configDB.js";
import { v4 as uuidv4 } from "uuid";

export async function createTableUser(req, res) {
  const db = await openDB();

  await db.exec(
    "CREATE TABLE IF NOT EXISTS User ( id UUID PRIMARY KEY UNIQUE NOT NULL, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, phone TEXT NOT NULL, address TEXT NOT NULL, password TEXT NOT NULL )"
  );
}

export async function createUser(req, res) {
  const userData = req.body;
  const db = await openDB();
  const uuid = uuidv4();
  const [user] = await db.all("SELECT * FROM User WHERE email=?", [
    userData.email,
  ]);

  if (!!user) {
    return res
      .status(409)
      .json({ message: "E-mail já cadastrado. Por favor, insira um novo." });
  }

  await db.run(
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

  res.json({
    statusCode: 200,
  });
}

export async function updateUser(req, res) {
  const user = req.body; // Recebe o objeto de usuário do corpo da solicitação
  const db = await openDB(); // Abre a conexão com o banco de dados

  const [emailVerification] = await db.all("SELECT * FROM User WHERE email=?", [
    userData.email,
  ]);

  if (!!emailVerification) {
    return res
      .status(409)
      .json({ message: "E-mail já cadastrado. Por favor, insira um novo." });
  }
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
  await db.run(updateQuery, updateParams);

  res.json({
    statusCode: 200,
  });
}

export async function getUsers(req, res) {
  const db = await openDB();

  return await db
    .all("SELECT* FROM User")
    .then((products) => res.json(products));
}

export async function getUserById(req, res) {
  const db = await openDB();
  const id = req.params.id;
  const [user] = await db.all("SELECT* FROM User WHERE id=?", [id]);

  return res.status(200).json(user);
}

export async function getUserByEmail(email) {
  const db = await openDB();
  const [user] = await db.all("SELECT * FROM User WHERE email=?", [email]);

  return res.status(200).json(user);
}

export async function deleteUser(req, res) {
  const id = req.params.id;
  const db = await openDB();

  await db.all("DELETE FROM User WHERE id=?", [id]);

  res.json({
    statusCode: 200,
  });
}

export async function logIn(req, res) {
  const db = await openDB();
  const email = req.body.email;
  const password = req.body.password;
  const [user] = await db.all("SELECT * FROM User WHERE email=?", [email]);

  if (!user) {
    return res.status(401).json({ message: "E-mail não cadastrado." });
  } else {
    if (user.password === password) {
      return res.status(200).json({
        tokenAcess: user.id,
        message: "Login bem-sucedido.",
      });
    } else {
      return res.status(401).json({ message: "Senha incorreta." });
    }
  }
}

export async function deleteTable(req, res) {
  const db = await openDB();

  await db.all("DROP TABLE IF EXISTS User");
}
