import { openDB } from "./configDB.js";
import { createTableProduct } from "./Controller/Product.js";
import { createTableUser } from "./Controller/User.js";
import { createTableFavoriteProduct } from "./Controller/FavoriteProduct.js";
import express from "express";
import fs from "fs";
import https from "https";
import cors from 'cors';
import router from "./routes.js";

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
}));
app.use(router);
app.use("*", (req, res) => {
  res.status(404).json({ message: `Rota '${req.originalUrl}' não encontrada!` });
});


createTableProduct();
createTableUser();
createTableFavoriteProduct();





app.listen(3000, ()=> console.log("API rodando"));

/* https.createServer({
  cert: fs.readFileSync('src/SSL/code.crt'),
  key: fs.readFileSync('src/SSL/code.key')
}, app).listen(3001, ()=> console.log("API rodando com https")); */