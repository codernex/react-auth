import { Request, Response } from 'express';
import ErrorHandler from '../utils/errorHandler';

export const errMiddleware = (
  err: ErrorHandler,
  _req: Request,
  res: Response
) => {
  err.message = err.message || 'Unexpected Server Error';
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    name: err.name,
    stack: err.stack
  });
};
