import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateGoodsLocationDto } from '../../dto/create-goods-location.dto';
import { CreateGoodsDto } from '../../dto/create-goods.dto';
import { GoodsNotFoundError } from '../../errors/goods.error';
import { GoodsLocationService } from './goodsLocation.service';

@ApiTags('goodsLocation')
@Controller('api/goodsLocation')
export class GoodsLocationController {
  constructor(private readonly goodsLocationService: GoodsLocationService) {}

  @ApiBody({ type: CreateGoodsLocationDto })
  @Post()
  async createOne(@Body() goodsLocationDto: CreateGoodsLocationDto) {
    return await this.goodsLocationService.create(goodsLocationDto);
  }

  @ApiParam({
    name: 'quantity',
    type: Number,
    description: 'quantity',
    example: 5,
  })
  @ApiParam({
    name: 'goodsInfo',
    type: String,
    description: 'goods info (goodId, size)',
    example: 'L10005 SM',
  })
  @Get(':goodsInfo/:quantity')
  async getLocation(
    @Param('goodsInfo') goodsInfo,
    @Param('quantity') quantity,
  ) {
    return await this.goodsLocationService.getLocation(goodsInfo, quantity);
  }

  @Get()
  async getList() {
    return await this.goodsLocationService.getList();
  }

  /*
  @ApiParam({
    name: 'id',
    type: String,
    description: 'goods id',
  })
  @ApiResponse({ status: 500, description: 'Unexpected server error' })
  @Get(':id')
  async getOne(@Param('id') id) {
    return await this.goodsLocationService.getOne(id);
  }*/

  @ApiParam({
    name: 'id',
    type: String,
    description: 'goods id',
  })
  @Put('id')
  async update(@Param('id') id, goodsDto: CreateGoodsDto) {
    try {
      await this.goodsLocationService.update(id, goodsDto);
    } catch (error) {
      if (error instanceof GoodsNotFoundError) {
        throw new NotFoundException(error.message);
      }
    }
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'goods id',
  })
  @Delete('id')
  async delete(@Param('id') id) {
    await this.goodsLocationService.delete(id);
  }
}
