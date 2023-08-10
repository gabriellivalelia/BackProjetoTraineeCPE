import { openDB } from "./configDB.js";
import { createTableProduct } from "./Controller/Product.js";
import { createTableUser } from "./Controller/User.js";



import express from "express";
const app = express();
app.use(express.json());

createTableProduct();
createTableUser();

import router from "./routes.js";

app.use(router);

app.listen(3000, ()=> console.log("API rodando"));