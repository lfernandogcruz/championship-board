import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import IUser from '../interfaces/IUser';
import User from '../models/User.model';
import 'dotenv/config';
import IToken from '../interfaces/IToken';

const JWT_SECRET = process.env.JWT_SECRET as string;

class UsersService {
  public db = User;

  public findUser = async (email: string, password: string): Promise<IUser> => {
    const user = await this.db.findOne({ where: { email }, raw: true }) as IUser;
    if (!user) return null as unknown as IUser;

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return null as unknown as IUser;

    const token = sign({ email }, JWT_SECRET, {
      expiresIn: '8d', algorithm: 'HS256' }) as unknown as IToken;

    return token as unknown as IUser;
  };
}

export default UsersService;
