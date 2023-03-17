import { Module } from '@nestjs/common';
import { SizeController } from './size.controller';
import { SizeService } from './size.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SizeEntity } from '../../entities/size.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SizeEntity])],
  controllers: [SizeController],
  providers: [SizeService],
})
export class SizeModule {}
