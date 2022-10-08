import * as bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import IUser from '../interfaces/IUser';
import User from '../models/User.model';

const loginValidation = {
  loginNotEmpty: (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as IUser;
    if (!email || !password || email === undefined || password === undefined) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    return next();
  },
  loginValidateEmail: (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body as IUser;
    const validateEmailInputRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isplayerEmailValid = validateEmailInputRegex.test(email);
    if (!isplayerEmailValid) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    return next();
  },
  loginFieldsLength: (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body as IUser;
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must have at least 6 characters' });
    }
    return next();
  },
  loginEmailAndPasswordValidation: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as IUser;
    const response = await User.findOne({ where: { email }, raw: true });
    if (!response) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    if (!bcrypt.compareSync(password, response.password)) {
      throw new Error('Sorry, incorrect password');
    }
    return next();
  },
};

export default loginValidation;
