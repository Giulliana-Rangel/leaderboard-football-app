import * as jwt from 'jsonwebtoken';
import { Ilogin } from '../interfaces/index.interface';

const secret: string = process.env.JWT_SECRET || 'secret';

// const JWT_CONFIG = {
//   algorithm: 'HS256',
//   // expiresIn: '15min',
// };

const createToken = (payload: Ilogin) => jwt.sign({ payload }, secret, {
  algorithm: 'HS256',
});

const validateToken = (token: string) => jwt.verify(token, secret);

export { createToken, validateToken };
