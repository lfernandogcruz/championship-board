// import * as bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import IUser from '../interfaces/IUser';
import User from '../models/User.model';

const loginValidation = {
  loginNotEmpty: (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as IUser;
    if (!email || !password || email === undefined || password === undefined) {
      // console.log('<><><><><><><><> loginNotEmpty - missing fields');
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    // console.log('loginNotEmpty');
    next();
  },
  loginValidateEmail: (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body as IUser;
    const validateEmailInputRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isplayerEmailValid = validateEmailInputRegex.test(email);
    if (!isplayerEmailValid) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    // console.log('loginValidateEmail');
    next();
  },
  loginFieldsLength: (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body as IUser;
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must have at least 6 characters' });
    }
    // console.log('loginFieldsLength');
    next();
  },
  loginEmailAndPasswordValidation: async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body as IUser;
    // const { email, password } = req.body as IUser;
    const response = await User.findOne({ where: { email }, raw: true });
    // console.log('response', response);
    if (!response) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    // const passwordCheck = bcrypt.compareSync(password, response.password);
    // // console.log('passwordCheck', passwordCheck);
    // if (!passwordCheck) {
    //   // console.log('Sorry, incorrect password');
    //   throw new Error('Sorry, incorrect password');
    // }
    // console.log('loginEmailAndPasswordValidation');
    next();
  },
};

export default loginValidation;
