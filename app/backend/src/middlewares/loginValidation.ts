import { NextFunction, Request, Response } from 'express';

const validaLogin = async (req: Request, res: Response, next: (NextFunction)) => {
  const regex = /^\S+@\S+\.\S+$/;
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (!regex.test(email)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  if (password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
};

export default validaLogin;
