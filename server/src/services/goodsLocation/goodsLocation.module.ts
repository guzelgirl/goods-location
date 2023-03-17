import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsLocationController } from './goodsLocation.controller';
import { GoodsLocationService } from './goodsLocation.service';
import { GoodsEntity } from '../../entities/goods.entity';
import { GoodsLocationEntity } from '../../entities/goodsLocation.entity';
import { SizeEntity } from '../../entities/size.entity';
import { StillageEntity } from '../../entities/stillage.entity';
import { SectionEntity } from '../../entities/section.entity';
import { LoggerService } from '../logger/logger.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GoodsEntity,
      GoodsLocationEntity,
      SectionEntity,
      StillageEntity,
      SizeEntity,
    ]),
  ],
  controllers: [GoodsLocationController],
  providers: [GoodsLocationService, LoggerService],
})
export class GoodsLocationModule {}
