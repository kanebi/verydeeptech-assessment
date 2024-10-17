import { Router } from "express";
import { Response } from "express";
import Cart from "../models/Cart";
import Product from "../models/Product";
import { AuthRequest, authenticateToken } from "../middleware/authMiddleware";

const router = Router();

// Get all products
router.get("/products", async (req: AuthRequest, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});
// Get One product
router.get("/products/:id", async (req: AuthRequest, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    if (error instanceof Error && error.name === "CastError") {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    res.status(500).json({ message: "Error fetching product", error });
  }
});

// Get products by category
router.get(
  "/products/category/:category",
  async (req: AuthRequest, res: Response) => {
    try {
      const { category } = req.params;
      const products = await Product.find({ category });
      res.json(products);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching products by category", error });
    }
  }
);

// Get user's cart
router.get(
  "/cart",
  authenticateToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      let cart = await Cart.findOne({ user: userId }).populate(
        "items.product"
      );
      if (!cart) {
        cart = new Cart({ user: userId, items: [] });
        cart.save()
      }
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: "Error fetching cart", error });
    }
  }
);

// Add item to cart
router.post(
  "/cart/add",
  authenticateToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user?.userId;
    
      let cart = await Cart.findOne({ user: userId });
      let product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({message:"Product not found"})
      }
      if (!cart) {
        cart = new Cart({ user: userId, items: [] });
      }

      const productIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );
      if (productIndex > -1) {
        cart.items[productIndex].quantity += quantity;
      } else {

        cart.items.push({ product: productId, quantity });
      }

      await cart.save();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: "Error adding item to cart", error });
    }
  }
);

// Update cart item quantity
router.put(
  "/cart/update",
  authenticateToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const { quantity, productId } = req.body;
      const userId = req.user?.userId;

      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        cart = new Cart({ user: userId, items: [] });
      }

      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
      } else {
        return res.status(404).json({ message: "Item not found in cart" });
      }

      await cart.save();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: "Error updating cart item", error });
    }
  }
);

// Remove item from cart
router.delete(
  "/cart/remove",
  authenticateToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const { productId } = req.body;
      const userId = req.user?.userId;

      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        cart = new Cart({ user: userId, items: [] });
      }

      cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId
      );
      await cart.save();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: "Error removing item from cart", error });
    }
  }
);

// Clear cart
router.delete(
  "/cart/clear",
  authenticateToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        cart = new Cart({ user: userId, items: [] });
      }

      cart.items = [];
      await cart.save();
      res.json({ message: "Cart cleared successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error clearing cart", error });
    }
  }
);

export default router;
