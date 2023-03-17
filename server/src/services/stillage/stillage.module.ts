import { Module } from '@nestjs/common';
import { StillageController } from './stillage.controller';
import { StillageService } from './stillage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StillageEntity } from '../../entities/stillage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StillageEntity])],
  controllers: [StillageController],
  providers: [StillageService],
})
export class StillageModule {}
