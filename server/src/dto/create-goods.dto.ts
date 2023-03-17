import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGoodsDto {
  @ApiProperty()
  @IsString()
  name: string;
}
