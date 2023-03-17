import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsEntity } from '../../entities/goods.entity';
import { GoodsLocationEntity } from '../../entities/goodsLocation.entity';
import { SectionEntity } from '../../entities/section.entity';
import { SizeEntity } from '../../entities/size.entity';
import { StillageEntity } from '../../entities/stillage.entity';
import { PopulateController } from './populate.controller';
import { PopulateService } from './populate.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GoodsEntity,
      GoodsLocationEntity,
      SizeEntity,
      SectionEntity,
      StillageEntity,
    ]),
  ],
  controllers: [PopulateController],
  providers: [PopulateService],
})
export class PopulateModule {}
