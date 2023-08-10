import { Router } from "express";
import { createUser, updateUser, getUsers, getUserById, deleteUser} from "./Controller/User.js"
import { createProduct, updateProduct, getProducts, getProductById , deleteProduct} from "./Controller/Product.js";

const router = Router();

//app
router.get('/', (req,res)=> {
    res.send("Hello, World!")
});

//user
router.get('/getUsers', getUsers);
router.get('/getUserById', getUserById);

router.post('/createUser', createUser);

router.put('/updateUser', updateUser);

router.delete('/deleteUser', deleteUser);

//product
router.get('/getProducts', getProducts);
router.get('/getProductById', getProductById);

router.post('/createProduct', createProduct);

router.put('/updateProduct', updateProduct);

router.delete('/deleteProduct', deleteProduct);

export default router;