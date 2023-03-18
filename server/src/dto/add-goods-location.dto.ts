import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddGoodsLocationDto {
  @ApiProperty({
    example: 'AB-3',
  })
  @IsString()
  locationInfo: string;

  @ApiProperty({
    example: 'L10007 SM',
  })
  @IsString()
  goodsInfo: string;
}
