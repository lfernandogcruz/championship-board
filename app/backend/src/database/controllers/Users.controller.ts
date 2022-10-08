import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import UsersService from '../services/Users.service';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET as string;

class UsersController {
  constructor(private usersService = new UsersService()) {}

  public async findUser(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const response = await this.usersService.findUser(email, password);
    if (!response) {
      return res.status(404).json({ message: 'Sorry, the princess is in another castle!' });
    }
    const token = sign({ email }, JWT_SECRET, { expiresIn: '8d', algorithm: 'HS256' });
    return res.status(200).json({ token });
  }
}

export default UsersController;
