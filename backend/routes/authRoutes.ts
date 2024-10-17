import { Router } from "express";
import { Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { config } from "dotenv";
import { authenticateToken, AuthRequest } from "../middleware/authMiddleware";
config();

const router = Router();
// User registration
router.post("/register", async (req: AuthRequest, res: Response) => {
  try {
    const { username, email, password,isAdmin } = req.body;

    // Check if useremail already exists
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check if username already exists
    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin
    }).set('-password');

    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

// User login
router.post("/login", async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create and assign token (expires in one hour)
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// Get user profile
router.get("/profile", authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile", error });
  }
});

// Update user profile
router.put("/profile", authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { username, email } = await req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user?.userId,
      { username, email },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user profile", error });
  }
});

export default router;
