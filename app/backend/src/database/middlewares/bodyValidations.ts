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
    next();
  },
  loginValidateEmail: (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body as IUser;
    const validateEmailInputRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isplayerEmailValid = validateEmailInputRegex.test(email);
    if (!isplayerEmailValid) {
      return res.status(401).json({ message: 'Incorrect email or password' });
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
  loginEmailAndPasswordValidation: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as IUser;
    const response = await User.findOne({ where: { email }, raw: true });
    if (!response) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    const passwordCheck = bcrypt.compareSync(password, response.password);
    if (!passwordCheck) {
      throw new Error('Sorry, incorrect password');
    }
    next();
  },
  postMatchesFieldsValidation: (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
    if (!homeTeam || !awayTeam || !homeTeamGoals || !awayTeamGoals || inProgress === undefined) {
      return res.status(401).json({ message: 'All fields must be filled' });
    }
    next();
  },
  differentTeamsValidation: (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      return res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  },
};

export default loginValidation;
