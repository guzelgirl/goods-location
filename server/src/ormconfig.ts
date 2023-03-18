import { DataSourceOptions } from 'typeorm';
import { GoodsEntity } from './entities/goods.entity';
import { SizeEntity } from './entities/size.entity';
import { SectionEntity } from './entities/section.entity';
import { StillageEntity } from './entities/stillage.entity';
import { GoodsLocationEntity } from './entities/goodsLocation.entity';
import { LogEntity } from './entities/log.entity';

export const ormconfig: DataSourceOptions = {
  type: 'mysql',
  host: 'mysql',
  port: 3306,
  username: 'MYSQL_USER',
  password: 'MYSQL_PASSWORD',
  database: 'goods_db',
  // entities: [`${__dirname}/../**/*.entity.js`],
  entities: [
    GoodsEntity,
    SizeEntity,
    SectionEntity,
    StillageEntity,
    GoodsLocationEntity,
    LogEntity,
  ],
  synchronize: true,
  logging: ['query', 'error'],
  logger: 'file',
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
};
