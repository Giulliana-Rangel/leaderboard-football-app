import { ModelStatic } from 'sequelize';
import { Ilogin } from '../../interfaces/index.interface';
import Users from '../models/Users.model';

export default class LoginService {
  private model: ModelStatic<Users> = Users;

  public async createLogin(user: Ilogin) {
    const result = await this.model.findOne({ where: { email: user.email } });
    return result;
  }
}
