import * as bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import IUser from '../interfaces/IUser';
import Matches from '../models/Matches.model';
import Teams from '../models/Teams.model';
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
  teamIdValidation: async (id:number) => {
    const response = await Teams.findByPk(id);
    if (!response) return false;
    return true;
  },
  postMatchesFieldsValidation: async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    if (!homeTeam || !awayTeam || !homeTeamGoals || !awayTeamGoals) {
      return res.status(401).json({ message: 'All fields must be filled' });
    }
    const homeTId = Number(homeTeam);
    const awayTId = Number(awayTeam);
    const isHomeTeamIdValid = await loginValidation.teamIdValidation(homeTId);
    const isAwayTeamIdValid = await loginValidation.teamIdValidation(awayTId);
    if (!isHomeTeamIdValid || !isAwayTeamIdValid) {
      return res.status(404).json({ message: 'There is no team with such id!' });
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
  matchIdValidation: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const isIdValid = await Matches.findByPk(Number(id));
    if (!isIdValid) {
      return res.status(401).json({ message: 'Match id must be a valid id' });
    }
    next();
  },
};

export default loginValidation;
