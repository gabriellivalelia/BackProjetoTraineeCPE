import { openDB } from "../configDB.js";
import { v4 as uuidv4 } from "uuid";

export async function createTableProduct() {
  const db = await openDB();

  db.exec(
    "CREATE TABLE IF NOT EXISTS Product ( id UUID PRIMARY KEY UNIQUE NOT NULL, name TEXT NOT NULL, price TEXT NOT NULL, image BLOB NOT NULL)"
  );
}

export async function createProduct(req, res) {
  const product = req.body;
  const uuid = uuidv4();
  const db = await openDB();

  db.run("INSERT INTO Product ( id, name, price, image) VALUES (?, ?, ?, ?)", [
    uuid,
    product.name,
    product.price,
    product.image,
  ]);

  res.json({
    statusCode: 200,
  });
}

export async function updateProduct(req, res) {
  const product = req.body;
  const db = await openDB();

  db.run("UPDATE Product SET name=?, price=?, image=?  WHERE  id=?", [
    product.name,
    product.price,
    product.image,
    product.id,
  ]);

  res.json({
    statusCode: 200,
  });
}

export async function getProducts(req, res) {
  const db = await openDB();
  return db.all("SELECT* FROM Product").then((products) => res.json(products));
}

export async function getProductById(req, res) {
  const id = req.params.id;
  const db = await openDB();

  return db
    .all("SELECT* FROM Product WHERE id=?", [id])
    .then((product) => res.json(product));
}

export async function deleteProduct(req, res) {
  const id = req.params.id;
  const db = await openDB();

  db.all("DELETE FROM Product WHERE id=?", [id]);

  res.json({
    statusCode: 200,
  });
}

export async function deleteTable() {
  const db = openDB();

  db.all("DROP TABLE IF EXISTS Product");
}
