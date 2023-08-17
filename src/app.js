import { openDB } from "./configDB.js";
import { createTableProduct } from "./Controller/Product.js";
import { createTableUser } from "./Controller/User.js";
import { createTableFavoriteProduct } from "./Controller/FavoriteProduct.js";
import express from "express";
import fs from "fs";
import https from "https";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

createTableProduct();
createTableUser();
createTableFavoriteProduct();

import router from "./routes.js";

app.use(router);

app.listen(3000, ()=> console.log("API rodando"));

https.createServer({
  cert: fs.readFileSync('src/SSL/code.crt'),
  key: fs.readFileSync('src/SSL/code.key')
}, app).listen(3001, ()=> console.log("API rodando com https"));