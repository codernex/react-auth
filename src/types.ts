import { NextFunction, Request, Response } from 'express';
import User from './entities/user';

export type ControllerFn = (
  req: Request & {
    session?: any;
    cookies?: any;
    user?: User | null;
  },
  res: Response,
  next: NextFunction
) => Promise<Response | void | null | NextFunction>;

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  username: string;
};
