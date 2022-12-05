import dotenv from 'dotenv';
import express, { Application } from 'express';
import userRouter from './routes/user';
import dataSource from './utils/typeorm.config';

dotenv.config();

const server = async (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true, limit: '100mb' }));

  await dataSource.initialize();

  app.use('/api/v1/user', userRouter);

  app.listen(process.env.PORT, () => {
    console.log(`Development Server Started on PORT: ${process.env.PORT}`);
  });
};

server(express());
