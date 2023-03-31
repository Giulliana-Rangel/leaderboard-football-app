import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import User from '../services/User.service';
import { createToken } from '../../auth/token';

export default class UserController {
  constructor(private service = new User()) { }

  public createLogin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      // console.log('Controller', email, password);
      const login = await this.service.createLogin({ email, password });
      if (!login) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const validaPassword = await bcrypt.compare(password, login.password);
      if (!validaPassword) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = createToken(login);
      return res.status(200).json({ token });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: (err as Error).message });
    }
  };

  public roleLogin = async (req: Request, res: Response) => {
    const { role } = req.body;
    console.log('controllerUser==>', { role });
    return res.status(200).json({ role });
  };
}
