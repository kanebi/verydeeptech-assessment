import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import commerceRoutes from "./routes/commerceRoutes";
import { authenticateToken } from "./middleware/authMiddleware";
import connectDB from "./db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Database connection
connectDB()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Api Routes
[
  { path: "/auth", router: authRoutes },
  {
    path: "/admin",
    router: adminRoutes,
    middleware: authenticateToken,
  },
  { path: "/commerce", router: commerceRoutes },
].forEach(({ path, router, middleware }) => {
  const fullPath = `/api${path}`;
  if (middleware) {
    app.use(fullPath, middleware, router);
  } else {
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
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  }
);
