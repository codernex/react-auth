import { createHash } from 'crypto';
import User from '../entities/user';
import { ControllerFn, CreateUserInput } from '../types';
import ErrorHandler from '../utils/errorHandler';

export const createUser: ControllerFn = async (req, res, next) => {
  const { email, username, password, name } = req.body as CreateUserInput;
  if (!email || !password || !username || !name) {
    return next(new ErrorHandler('Please provide required information', 404));
  }

  const userExistWithEmail = await User.findOne({
    where: {
      email
    }
  });

  const userExistWitUserName = await User.findOne({
    where: {
      username
    }
  });

  if (userExistWitUserName || userExistWithEmail) {
    return next(new ErrorHandler('User already exist', 404));
  }

  const hassPwd = createHash(password);

  const user = User.create({ ...req.body, password: hassPwd });

  await user.save();

  return res?.status(201).json(user);
};

export const getUsers: ControllerFn = async (_req, res, _next) => {
  const user = await User.find();

  return res.status(200).json(user);
};
