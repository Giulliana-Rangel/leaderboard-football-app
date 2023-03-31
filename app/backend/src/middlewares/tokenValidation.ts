import { NextFunction, Request, Response } from 'express';
import { IPayloadUser } from '../interfaces/index.interface';
import { validateToken } from '../auth/token';

const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = validateToken(authorization) as unknown as IPayloadUser;
    console.log('tokenValidation:', decoded.payload.role);
    req.body.role = decoded.payload.role;
    console.log(decoded.payload.role);
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export default tokenValidation;
