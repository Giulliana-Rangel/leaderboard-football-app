import { NextFunction, Request, Response } from 'express';
import { IUser } from '../interfaces/index.interface';
import { validateToken } from '../auth/token';

const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = validateToken(authorization) as IUser;
    req.body.role = decoded.role;
  } catch (err) {
    // console.log(err);
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export default tokenValidation;
