import { Router } from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/products.controller.js";

const router = Router();

// POST a new product
router.post("/", createProduct);

// GET all products (optional)
router.get("/", getAllProducts);

export default router;
