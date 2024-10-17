import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

export interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}
// Middleware to check i usertoken is valid and  update request with user after verification
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    // console.log('user verified ', user)
    req.user = user;
    next();
  });
};


// Middleware to check if user is admin
export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.user?.userId);
      if (user && user.isAdmin) {
        next();
      } else {
        res.status(403).json({ message: "Access denied. Admin only." });
      }
    } catch (error) {
      res.status(500).json({ message: "Error checking admin status", error });
    }
  };
  