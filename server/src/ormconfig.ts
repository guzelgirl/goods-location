import { DataSourceOptions } from 'typeorm';
import { CustomLogger } from './utils/logger';

export const ormconfig: DataSourceOptions = {
  type: 'mysql',
  host: 'mysql',
  port: 3306,
  username: 'MYSQL_USER',
  password: 'MYSQL_PASSWORD',
  database: 'goods_db',
  entities: [`${__dirname}/../**/*.entity.js`],
  synchronize: true,
  logging: ['query', 'error'],
  logger: 'file', //new CustomLogger(),
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
};
