import Users from '../models/Users.model';

class UsersService {
  private db = Users;

  public findOne = async (email: string, password: string): Promise<Users> => {
    const user = await this.db.findOne({ where: { email, password } });
    return user as Users;
  };
}

export default UsersService;
