import connectRedis from 'connect-redis';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import { errMiddleware } from './middleware/err';
import authRoute from './routes/auth';
import userRouter from './routes/user';
import dataSource from './utils/typeorm.config';

dotenv.config();

const server = async (app: Application) => {
  const redisClient = new Redis();
  const RedisStore = connectRedis(session);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true, limit: '100mb' }));

  app.use(
    session({
      secret: 'mysecret',
      name: '_authid',
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({ client: redisClient, disableTTL: true }),
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: 'lax',
        path: '/'
      }
    })
  );

  await dataSource.initialize();

  app.use('/api/v1/user', userRouter);
  app.use('/api/v1/auth', authRoute);

  app.use(errMiddleware);
  app.listen(process.env.PORT, () => {
    console.log(`Development Server Started on PORT: ${process.env.PORT}`);
  });
};

server(express());
