import { Request, Response } from 'express';
import UsersService from '../services/Users.service';

class UsersController {
  constructor(private usersService = new UsersService()) {}

  public async findUser(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const response = await this.usersService.findUser(email, password);
    if (!response) {
      return res.status(404).json({ message: 'Sorry, the princess is in another castle!' });
    }
    return res.status(200).json({ token: response });
  }
}

export default UsersController;
