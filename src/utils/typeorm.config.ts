import { DataSource } from 'typeorm';
import User from '../entities/user';

const dataSource = new DataSource({
  type: 'postgres',
  database: 'reactauth',
  host: 'localhost',
  username: 'postgres',
  password: '5105',
  logging: true,
  synchronize: true,
  port: 5432,
  entities: [User]
});

export default dataSource;
