import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateGoodsLocationDto {
  @ApiProperty()
  @IsNumber()
  goodsId: number;

  @ApiProperty()
  @IsNumber()
  stillageId: number;

  @ApiProperty()
  @IsNumber()
  sectionId: number;

  @ApiProperty()
  @IsNumber()
  sizeId: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;
}
