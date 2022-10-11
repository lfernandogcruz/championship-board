import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || 'secretao';

const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const decoded = jwt.verify(authorization, JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default tokenValidation;
