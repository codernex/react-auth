import { NextFunction, Request, Response } from 'express';
import { Session, SessionData } from 'express-session';
import User from './entities/user';

export type ControllerFn = (
  req: Request & {
    session: Session &
      Partial<SessionData> & {
        userId?: number;
      };
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

export type LoginInput = {
  usernameOrEmail: string;
  password: string;
};
