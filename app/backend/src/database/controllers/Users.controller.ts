import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import UsersService from '../services/Users.service';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET as string;

class UsersController {
  constructor(private usersService: UsersService) {}

  public async findOne(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.usersService.findOne(email, password);
    if (!user) {
      return res.status(404).json({ message: 'Sorry, the princess is in another castle!' });
    }
    const token = sign({ data: user }, JWT_SECRET, { expiresIn: '8d' });
    return res.status(200).json({ token });
  }
}

export default UsersController;
