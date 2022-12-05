import User from '../entities/user';
import { ControllerFn } from '../types';
import ErrorHandler from '../utils/errorHandler';

export const isAuth: ControllerFn = async (req, res, next) => {
  if (!req.session.userId) {
    return next(new ErrorHandler('Please login to acess this route', 403));
  }

  const user = await User.findOne({
    where: {
      id: req.session.userId
    }
  });

  if (!user) {
    return next(new ErrorHandler('Please login to acess this route', 403));
  }

  next();
};
