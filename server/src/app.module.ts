import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PopulateModule } from './services/populate/populate.module';
import { ormconfig } from './ormconfig';
import { GoodsModule } from './services/goods/goods.module';
import { GoodsLocationModule } from './services/goodsLocation/goodsLocation.module';
import { StillageModule } from './services/stillage/stillage.module';
import { SectionModule } from './services/section/section.module';
import { SizeModule } from './services/size/size.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    PopulateModule,
    GoodsModule,
    GoodsLocationModule,
    StillageModule,
    SectionModule,
    SizeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
