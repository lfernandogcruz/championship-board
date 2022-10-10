import { Request, Response } from 'express';
// import IToken from '../interfaces/IToken';
import UsersService from '../services/Users.service';

class UsersController {
  constructor(private usersService = new UsersService()) {}

  public async findUser(req: Request, res: Response): Promise<Response | unknown> {
    const { email, password } = req.body;
    const response = await this.usersService.findUser(email, password);
    if (!response) {
      return res.status(404).json({ message: 'Sorry, the princess is in another castle!' });
    }
    req.headers.authorization = response as unknown as string;
    return res.status(200).json({ token: response });
  }

  public async validateHeader(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    const response = await this.usersService.validateHeader(authorization as string);
    if (!response) {
      return res.status(401).json({ message: 'Token not found' });
    }
    return res.status(200).json({ role: response.role });
  }
}

export default UsersController;
