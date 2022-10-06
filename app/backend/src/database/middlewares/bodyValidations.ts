import { NextFunction, Request, Response } from 'express';
import ILogin from '../interfaces/ILogin';

const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body as ILogin;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must have at least 6 characters' });
  }

  next();
};

export default loginValidation;
