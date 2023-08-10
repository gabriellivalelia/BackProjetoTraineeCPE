import { Router } from "express";
import { createTableUser, createUser, updateUser, getUsers, getUserById, deleteUser, deleteTable } from "./Controller/User.js"

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


export default router;