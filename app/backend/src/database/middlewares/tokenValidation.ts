import { NextFunction, Request, Response } from 'express';

const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export default tokenValidation;
