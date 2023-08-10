import { Router } from "express";
import { body, validationResult } from 'express-validator';
import { createUser, updateUser, getUsers, getUserById, getUserByEmail, deleteUser} from "./Controller/User.js"
import { createProduct, updateProduct, getProducts, getProductById , deleteProduct} from "./Controller/Product.js";
import { createFavoriteProduct, updateFavoriteProduct, getFavoriteProducts, getFavoriteProductById, getProductIdsOfFavoriteProductsByUserId, getIdFavoriteProductByProductIdAndUserId , deleteFavortiteProduct } from "./Controller/FavoriteProduct.js";




const router = Router();

//app
router.get('/', (req,res)=> {
    res.send("Hello, World!")
});

//user
router.get('/getUsers', getUsers);
router.get(
    '/getUserById',
    [
        body('id').notEmpty().withMessage('Id de usuário é obrigatório.'), 
    ],
    (req, res) => {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        getUserById(req, res);
      }
);

router.get(
    '/getUserByEmail',
    [
        body('email').isEmail().withMessage('Email é obrigatório.'), 
    ],
    (req, res) => {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        getUserByEmail(req, res);
      }
);

router.post(
    '/createUser',
    [
      body('name').notEmpty().withMessage('Nome de usuário é obrigatório.'),
      body('email').isEmail().withMessage('Digite um email válido.').custom(async (value) => {
        const user = await getUserByEmail(value);
        if (user && user.id.toString() !== body('id')) {
            throw new Error('Este email já está cadastrado.');
          }
          return true;
      }),
      body('phone').notEmpty().withMessage('Telefone é obrigatório.'),
      body('address').notEmpty().withMessage('Endereço é obrigatório.'),
      body('password').notEmpty().withMessage('A senha é obrigatória').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres.'),

    ],
    (req, res) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      createUser(req, res);
    }
  );

router.put(
    '/updateUser',
    [
        body('name').optional().notEmpty().withMessage('Nome de usuário não pode ser nulo.'),
        body('email').optional().isEmail().withMessage('Digite um email válido.').custom(async (email) => {
            const user = await getUserByEmail(email);
            if (user && user.id.toString() !== body('id')) {
                throw new Error('Este email já está cadastrado.');
              }
              return true;
          }),
        body('phone').optional().notEmpty().withMessage('Telefone não poder ser nulo.'),
        body('address').optional().notEmpty().withMessage('Endereço não pode ser nulo.'),
        body('password').optional().notEmpty().withMessage('A senha é obrigatória').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres.'),
  
      ],
      (req, res) => {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        updateUser(req, res);
      }
);

router.delete(
    '/deleteUser',
    [
        body('id').notEmpty().withMessage('Id de usuário é obrigatório.'), 
    ],
    (req, res) => {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        deleteUser(req, res);
    }  
);

//product
router.get('/getProducts', getProducts);
router.get(
    '/getProductById',
    [
        body('id').notEmpty().withMessage('Id de produto é obrigatório.'), 
    ],
    (req, res) => {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        getProductById(req, res);
    }  
);

router.post(
    '/createProduct',
    [
        body('name').notEmpty().withMessage('Nome do produto é obrigatório.'),
        body('price').notEmpty().withMessage('Preço do produto é obrigatório.'),
        body('image').notEmpty().withMessage('Imagem do produto é obrigatório.') 
    ],
    (req,res) => {
        const errors = validationResult(req);
  
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        
        createProduct(req, res); 
    } 
);

router.put(
    '/updateProduct',
    [
        body('name').optional().notEmpty().withMessage('Nome do produto não pode ser nulo.'),
        body('price').optional().notEmpty().withMessage('Preço do produto não pode ser nulo.'),
        body('image').optional().notEmpty().withMessage('Imagem do produto não pode ser nulo.') 
    ],
    (req,res) => {
        const errors = validationResult(req);
  
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        
        updateProduct(req, res); 
    } 
     );

router.delete(
    '/deleteProduct',
    [
        body('id').notEmpty().withMessage('Id de produto é obrigatório.'), 
    ],
    (req, res) => {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        deleteProduct(req, res);
    } 
);

//favoriteProduct
router.get('/getFavoriteProducts', getFavoriteProducts);
router.get(
    '/getFavoriteProductById',
    [
        body('id').notEmpty().withMessage('A id é obrigatória.') 
    ],

    (req,res) => {
        const errors = validationResult(req);
  
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        
        getFavoriteProductById(req, res); 
    }     
);
router.get(
    '/getProductIdsOfFavoriteProductsByUserId',
    [
        body('userId').notEmpty().withMessage('A id do usuário é obrigatória.') 
    ],

    (req,res) => {
        const errors = validationResult(req);
  
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        
        getProductIdsOfFavoriteProductsByUserId(req, res); 
    }    
);
router.get(
    '/getIdFavoriteProductByProductIdAndUserId',
    [
        body('userId').notEmpty().withMessage('A id do usuário é obrigatória.'),
        body('productId').notEmpty().withMessage('A id do produto é obrigatória.') 
    ],

    (req,res) => {
        const errors = validationResult(req);
  
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        
        getIdFavoriteProductByProductIdAndUserId(req, res); 
    }  
);

router.post(
    '/createFavoriteProduct',
    [
        body('userId').notEmpty().withMessage('A id do usuário é obrigatória.'),
        body('productId').notEmpty().withMessage('A id do produto é obrigatória.') 
    ],

    (req,res) => {
        const errors = validationResult(req);
  
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        
        createFavoriteProduct(req, res); 
    }     
);

router.put(
    '/updateFavoriteProduct',
    [
        body('userId').optional().notEmpty().withMessage('A id do usuário não pode ser nula.'),
        body('productId').optional().notEmpty().withMessage('A id do produto não pode ser nula.') 
    ],

    (req,res) => {
        const errors = validationResult(req);
  
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        
        updateFavoriteProduct(req, res); 
    }  
);

router.delete(
    '/deleteFavoriteProduct', 
    [
        body('id').notEmpty().withMessage('A id é obrigatória.') 
    ],

    (req,res) => {
        const errors = validationResult(req);
  
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        
        deleteFavortiteProduct(req, res); 
    }  
);

export default router;