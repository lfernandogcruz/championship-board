import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import UsersService from '../services/Users.service';

const JWT_SECRET = 'burn_after_reading';

class UsersController {
  constructor(private usersService: UsersService) {}

  public async findOne(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.usersService.findOne(email, password);
    if (!user) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }
    const token = sign({ data: user }, JWT_SECRET, { expiresIn: '8d' });
    return res.status(200).json({ token });
  }
}

export default UsersController;
