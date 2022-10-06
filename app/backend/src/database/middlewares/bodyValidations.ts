import { NextFunction, Request, Response } from 'express';
import IUser from '../interfaces/ILogin';

const loginValidation = {
  loginNotEmpty: (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as IUser;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  },
  loginValidateEmail: (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body as IUser;
    const validateEmailInputRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isplayerEmailValid = validateEmailInputRegex.test(email);
    if (!isplayerEmailValid) {
      return res.status(400).json({ message: '"email" must be a valid email' });
    }
    next();
  },
  loginFieldsLength: (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body as IUser;
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must have at least 6 characters' });
    }
    next();
  },
};

export default loginValidation;
