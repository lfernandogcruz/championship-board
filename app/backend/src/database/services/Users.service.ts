import IUser from '../interfaces/IUser';
import User from '../models/User.model';

class UsersService {
  public db = User;

  public findUser = async (email: string, password: string): Promise<IUser> => {
    const user = await this.db.findOne({ where: { email, password } }) as IUser;
    return user as unknown as IUser;
  };
}

export default UsersService;
