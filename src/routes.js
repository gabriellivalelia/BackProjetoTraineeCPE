import { Router } from "express";
import { body, param, validationResult } from "express-validator";
import {
  createUser,
  updateUser,
  getUsers,
  getUserById,
  getUserByEmail,
  deleteUser,
  logIn,
} from "./Controller/User.js";
import {
  createProduct,
  updateProduct,
  getProducts,
  getProductById,
  deleteProduct,
} from "./Controller/Product.js";
import {
  createFavoriteProduct,
  updateFavoriteProduct,
  getFavoriteProducts,
  getFavoriteProductById,
  getProductIdsOfFavoriteProductsByUserId,
  getIdFavoriteProductByProductIdAndUserId,
  deleteFavoriteProduct,
} from "./Controller/FavoriteProduct.js";

const router = Router();

//app
router.get("/", (req, res) => {
  res.send("Hello, World!");
});

//user
router.get("/getUsers", getUsers);
router.get(
  "/getUserById/:id",
  [param("id").notEmpty().withMessage("Id de usuário é obrigatório.")],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await getUserById(req, res);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
);

router.get(
  "/getUserByEmail",
  [body("email").isEmail().withMessage("Email é obrigatório.")],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await getUserByEmail(req.body.email);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
);

router.post(
  "/createUser",
  [
    body("name").notEmpty().withMessage("Nome de usuário é obrigatório."),
    body("email").isEmail().withMessage("Digite um email válido."),
    body("phone").notEmpty().withMessage("Telefone é obrigatório."),
    body("address").notEmpty().withMessage("Endereço é obrigatório."),
    body("password")
      .notEmpty()
      .withMessage("A senha é obrigatória")
      .isLength({ min: 6 })
      .withMessage("A senha deve ter pelo menos 6 caracteres."),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await createUser(req, res);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }
);

router.put(
  "/updateUser",
  [
    body("name")
      .optional()
      .notEmpty()
      .withMessage("Nome de usuário não pode ser nulo."),
    body("email").optional().isEmail().withMessage("Digite um email válido."),
    body("phone")
      .optional()
      .notEmpty()
      .withMessage("Telefone não poder ser nulo."),
    body("address")
      .optional()
      .notEmpty()
      .withMessage("Endereço não pode ser nulo."),
    body("password")
      .optional()
      .notEmpty()
      .withMessage("A senha é obrigatória")
      .isLength({ min: 6 })
      .withMessage("A senha deve ter pelo menos 6 caracteres."),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await updateUser(req, res);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
);

router.delete(
  "/deleteUser/:id",
  [param("id").notEmpty().withMessage("Id de usuário é obrigatório.")],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await deleteUser(req, res);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
);

router.post(
  "/logIn",
  [
    body("email").isEmail().withMessage("Digite um email válido."),
    body("password")
      .notEmpty()
      .withMessage("A senha é obrigatória")
      .isLength({ min: 6 })
      .withMessage("A senha deve ter pelo menos 6 caracteres."),
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await logIn(req, res);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }
);

//product
router.get("/getProducts", getProducts);
router.get(
  "/getProductById",
  [body("id").notEmpty().withMessage("Id de produto é obrigatório.")],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await getProductById(req, res);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
);

router.post(
  "/createProduct",
  [
    body("name").notEmpty().withMessage("Nome do produto é obrigatório."),
    body("price").notEmpty().withMessage("Preço do produto é obrigatório."),
    body("image").notEmpty().withMessage("Imagem do produto é obrigatório."),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await createProduct(req, res);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
);

router.put(
  "/updateProduct",
  [
    body("name")
      .optional()
      .notEmpty()
      .withMessage("Nome do produto não pode ser nulo."),
    body("price")
      .optional()
      .notEmpty()
      .withMessage("Preço do produto não pode ser nulo."),
    body("image")
      .optional()
      .notEmpty()
      .withMessage("Imagem do produto não pode ser nulo."),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await updateProduct(req, res);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
);

router.delete(
  "/deleteProduct/:id",
  [param("id").notEmpty().withMessage("Id de produto é obrigatório.")],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await deleteProduct(req, res);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
);

//favoriteProduct
router.get("/getFavoriteProducts", getFavoriteProducts);
router.get(
  "/getFavoriteProductById/:id",
  [param("id").notEmpty().withMessage("A id é obrigatória.")],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await getFavoriteProductById(req, res);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
);
router.get(
  "/getProductIdsOfFavoriteProductsByUserId/:userId",
  [param("userId").notEmpty().withMessage("A id do usuário é obrigatória.")],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await getProductIdsOfFavoriteProductsByUserId(req, res);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
);
router.get(
  "/getIdFavoriteProductByProductIdAndUserId/:productId/:userId",
  [
    param("userId").notEmpty().withMessage("A id do usuário é obrigatória."),
    param("productId").notEmpty().withMessage("A id do produto é obrigatória."),
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await getIdFavoriteProductByProductIdAndUserId(req, res);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
);

router.post(
  "/createFavoriteProduct",
  [
    body("userId").notEmpty().withMessage("A id do usuário é obrigatória."),
    body("productId").notEmpty().withMessage("A id do produto é obrigatória."),
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await createFavoriteProduct(req, res);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
);

router.put(
  "/updateFavoriteProduct",
  [
    body("userId")
      .optional()
      .notEmpty()
      .withMessage("A id do usuário não pode ser nula."),
    body("productId")
      .optional()
      .notEmpty()
      .withMessage("A id do produto não pode ser nula."),
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await updateFavoriteProduct(req, res);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
);

router.delete(
  "/deleteFavoriteProduct/:id",
  [param("id").notEmpty().withMessage("A id é obrigatória.")],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await await deleteFavoriteProduct(req, res);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
);

export default router;
