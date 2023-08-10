import { openDB } from "../configDB.js";
import { v4 as uuidv4 } from 'uuid';


export async function createTableFavoriteProduct(){
    await openDB().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS FavoriteProduct ( id UUID PRIMARY KEY NOT NULL, userId UUID NOT NULL, productId UUID NOT NULL, FOREIGN KEY (userId) REFERENCES User(id), FOREIGN KEY (productId) REFERENCES Product(id))');
    });
    
}

export async function createFavoriteProduct(req,res){
    let favoriteProduct = req.body;
    const uuid = uuidv4();
    openDB()
    .then(db=>{
        db.run('INSERT INTO FavoriteProduct ( id, userId, productId) VALUES (?, ?, ?)', [uuid, favoriteProduct.userId, favoriteProduct.productId])
    });
    res.json({
        "statusCode": 200
    });
}

export async function updateFavoriteProduct(req,res){
    let favoriteProduct = req.body;
    openDB()
    .then(db=>{
        db.run('UPDATE FavoriteProduct SET userId=?, productId=? WHERE  id=?', [favoriteProduct.userId, favoriteProduct.productId, favoriteProduct.id])
    });
    res.json({
        "statusCode": 200
    });
}

export async function getFavoriteProducts(req,res){
    return openDB()
    .then(db=>{
        return db.all('SELECT* FROM FavoriteProduct')
        .then(favoriteProducts=>res.json(favoriteProducts))
    });
}

export async function getFavoriteProductById(req,res){
    let id = req.body.id;
    return openDB()
    .then(db=>{
        return db.all('SELECT* FROM FavoriteProduct WHERE id=?', [id])
        .then(favoriteProduct=>res.json(favoriteProduct))
    }); 
}

export async function getIdFavoriteProductByProductIdAndUserId(req,res){
    let productId = req.body.productId;
    let userId = req.body.userId;

    return openDB()
    .then(db=>{
        return db.all('SELECT* FROM FavoriteProduct WHERE productId=? AND userId=?', [productId, userId])
        .then(rows=> {
            const favoriteProductId = rows.map(row => row.id);
            res.json(favoriteProductId);
        })
    }); 
}

export async function getProductIdsOfFavoriteProductsByUserId(req,res){
    let userId = req.body.userId;
    return openDB()
    .then(db=>{
        return db.all('SELECT* FROM FavoriteProduct WHERE userId=?', [userId])
        .then(rows => {
            const productIds = rows.map(row => row.productId);
            res.json(productIds);
        })
    }); 
}

export async function deleteFavortiteProduct(req,res){
    let id = req.body.id;
    openDB()
    .then(db=>{
        db.all('DELETE FROM FavoriteProduct WHERE id=?', [id])
    });
    res.json({
        "statusCode": 200
    });
}

export async function deleteTable(){
    openDB()
    .then(db=>{
        db.all('DROP TABLE IF EXISTS FavoriteProduct')
    });
}

