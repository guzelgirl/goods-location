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
import { ConfigService, ConfigModule } from '@nestjs/config';
import { dataSource } from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ormconfig,
      async dataSourceFactory() {
        await dataSource.initialize();
        return dataSource;
      },
    }),
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
