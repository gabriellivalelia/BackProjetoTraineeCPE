import { openDB } from "../configDB.js";
import { v4 as uuidv4 } from "uuid";

export async function createTableFavoriteProduct() {
  const db = await openDB();

  db.exec(
    "CREATE TABLE IF NOT EXISTS FavoriteProduct ( id UUID PRIMARY KEY NOT NULL, userId UUID NOT NULL, productId UUID NOT NULL, FOREIGN KEY (userId) REFERENCES User(id), FOREIGN KEY (productId) REFERENCES Product(id))"
  );
}

export async function createFavoriteProduct(req, res) {
  const favoriteProduct = req.body;
  const uuid = uuidv4();
  const db = await openDB();

  db.run(
    "INSERT INTO FavoriteProduct ( id, userId, productId) VALUES (?, ?, ?)",
    [uuid, favoriteProduct.userId, favoriteProduct.productId]
  );
  res.json({
    statusCode: 200,
  });
}

export async function updateFavoriteProduct(req, res) {
  const favoriteProduct = req.body;
  const db = await openDB();

  db.run("UPDATE FavoriteProduct SET userId=?, productId=? WHERE  id=?", [
    favoriteProduct.userId,
    favoriteProduct.productId,
    favoriteProduct.id,
  ]);

  res.json({
    statusCode: 200,
  });
}

export async function getFavoriteProducts(req, res) {
  const db = await openDB();

  return db
    .all("SELECT* FROM FavoriteProduct")
    .then((products) => res.json(products));
}

export async function getFavoriteProductById(req, res) {
  const id = req.params.id;
  const db = await openDB();

  return db.all("SELECT* FROM FavoriteProduct WHERE id=?", [id]);
}

export async function getIdFavoriteProductByProductIdAndUserId(req, res) {
  const productId = req.params.productId;
  const userId = req.params.userId;
  const db = await openDB();

  return db
    .all("SELECT* FROM FavoriteProduct WHERE productId=? AND userId=?", [
      productId,
      userId,
    ])
    .then((rows) => {
      const favoriteProductId = rows.map((row) => row.id);
      res.json(favoriteProductId);
    });
}

export async function getProductIdsOfFavoriteProductsByUserId(req, res) {
  const userId = req.params.userId;
  const db = await openDB();

  return db
    .all("SELECT* FROM FavoriteProduct WHERE userId=?", [userId])
    .then((rows) => {
      const productIds = rows.map((row) => row.productId);
      res.json(productIds);
    });
}

export async function deleteFavoriteProduct(req, res) {
  const id = req.params.id;
  const db = await openDB();

  db.all("DELETE FROM FavoriteProduct WHERE id=?", [id]);

  res.json({
    statusCode: 200,
  });
}

export async function deleteTable() {
  const db = await openDB();

  db.all("DROP TABLE IF EXISTS FavoriteProduct");
}
