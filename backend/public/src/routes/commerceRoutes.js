"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Cart_1 = __importDefault(require("../models/Cart"));
const Product_1 = __importDefault(require("../models/Product"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Get all products
router.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.find();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
}));
// Get One product
router.get("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    }
    catch (error) {
        if (error instanceof Error && error.name === "CastError") {
            return res.status(400).json({ message: "Invalid product ID" });
        }
        res.status(500).json({ message: "Error fetching product", error });
    }
}));
// Get products by category
router.get("/products/category/:category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.params;
        const products = yield Product_1.default.find({ category });
        res.json(products);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error fetching products by category", error });
    }
}));
// Get user's cart
router.get("/cart", authMiddleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        let cart = yield Cart_1.default.findOne({ user: userId }).populate("items.product");
        if (!cart) {
            cart = new Cart_1.default({ user: userId, items: [] });
            cart.save();
        }
        res.json(cart);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching cart", error });
    }
}));
// Add item to cart
router.post("/cart/add", authMiddleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { productId, quantity } = req.body;
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId;
        let cart = yield Cart_1.default.findOne({ user: userId });
        let product = yield Product_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (!cart) {
            cart = new Cart_1.default({ user: userId, items: [] });
        }
        const productIndex = cart.items.findIndex((item) => item.product.toString() === productId);
        if (productIndex > -1) {
            cart.items[productIndex].quantity += quantity;
        }
        else {
            cart.items.push({ product: productId, quantity });
        }
        yield cart.save();
        res.json(cart);
    }
    catch (error) {
        res.status(500).json({ message: "Error adding item to cart", error });
    }
}));
// Update cart item quantity
router.put("/cart/update", authMiddleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { quantity, productId } = req.body;
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.userId;
        let cart = yield Cart_1.default.findOne({ user: userId });
        if (!cart) {
            cart = new Cart_1.default({ user: userId, items: [] });
        }
        const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
        }
        else {
            return res.status(404).json({ message: "Item not found in cart" });
        }
        yield cart.save();
        res.json(cart);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating cart item", error });
    }
}));
// Remove item from cart
router.delete("/cart/remove", authMiddleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const { productId } = req.body;
        const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.userId;
        let cart = yield Cart_1.default.findOne({ user: userId });
        if (!cart) {
            cart = new Cart_1.default({ user: userId, items: [] });
        }
        cart.items = cart.items.filter((item) => item.product.toString() !== productId);
        yield cart.save();
        res.json(cart);
    }
    catch (error) {
        res.status(500).json({ message: "Error removing item from cart", error });
    }
}));
// Clear cart
router.delete("/cart/clear", authMiddleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const userId = (_e = req.user) === null || _e === void 0 ? void 0 : _e.userId;
        let cart = yield Cart_1.default.findOne({ user: userId });
        if (!cart) {
            cart = new Cart_1.default({ user: userId, items: [] });
        }
        cart.items = [];
        yield cart.save();
        res.json({ message: "Cart cleared successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error clearing cart", error });
    }
}));
exports.default = router;
//# sourceMappingURL=commerceRoutes.js.map