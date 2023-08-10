import { Router } from "express";
import { createUser, updateUser, getUsers, getUserById, deleteUser} from "./Controller/User.js"
import { createProduct, updateProduct, getProducts, getProductById , deleteProduct} from "./Controller/Product.js";
import { createFavoriteProduct, updateFavoriteProduct, getFavoriteProducts, getFavoriteProductById, getProductIdsOfFavoriteProductsByUserId, getIdFavoriteProductByProductIdAndUserId , deleteFavortiteProduct } from "./Controller/FavoriteProduct.js";

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

//favoriteProduct
router.get('/getFavoriteProducts', getFavoriteProducts);
router.get('/getFavoriteProductById', getFavoriteProductById);
router.get('/getProductIdsOfFavoriteProductsByUserId', getProductIdsOfFavoriteProductsByUserId);
router.get('/getIdFavoriteProductByProductIdAndUserId', getIdFavoriteProductByProductIdAndUserId);

router.post('/createFavoriteProduct', createFavoriteProduct);

router.put('/updateFavoriteProduct', updateFavoriteProduct);

router.delete('/deleteFavoriteProduct', deleteFavortiteProduct);

export default router;