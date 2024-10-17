import { Router } from "express";
import { Response } from "express";
import Product from "../models/Product";
import { AuthRequest, isAdmin } from "../middleware/authMiddleware";

const router = Router();

// Create a new product
router.post("/products", isAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: "Error creating product", error });
  }
});

// Update a product
router.put("/products/:id", isAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: "Error updating product", error });
  }
});

// Delete a product
router.delete("/products/:id", isAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
});

export default router;
