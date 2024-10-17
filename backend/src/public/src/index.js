"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const commerceRoutes_1 = __importDefault(require("./routes/commerceRoutes"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const db_1 = __importDefault(require("./db"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
// Database connection
(0, db_1.default)()
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
// Api Routes
[
    { path: "/auth", router: authRoutes_1.default },
    {
        path: "/admin",
        router: adminRoutes_1.default,
        middleware: authMiddleware_1.authenticateToken,
    },
    { path: "/commerce", router: commerceRoutes_1.default },
].forEach(({ path, router, middleware }) => {
    const fullPath = `/api${path}`;
    if (middleware) {
        app.use(fullPath, middleware, router);
    }
    else {
        app.use(fullPath, router);
    }
});
// Basic route
app.get("/", (req, res) => {
    res.send("Welcome to VeryDeep Backend API");
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});
//# sourceMappingURL=index.js.map