import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddGoodsLocationDto } from '../../dto/add-goods-location.dto';
import { CreateGoodsLocationDto } from '../../dto/create-goods-location.dto';
import { GoodsLocationService } from './goodsLocation.service';

@ApiTags('goodsLocation')
@Controller('api/goodsLocation')
export class GoodsLocationController {
  constructor(private readonly goodsLocationService: GoodsLocationService) {}

  @ApiBody({ type: AddGoodsLocationDto })
  @Post('add')
  async addLocation(@Body() goodsLocationDto: AddGoodsLocationDto) {
    try {
      return await this.goodsLocationService.addLocation(goodsLocationDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
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
    try {
      return await this.goodsLocationService.getLocation(goodsInfo, quantity);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
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
  @Put('substract/:goodsInfo/:quantity')
  async substractGoods(
    @Param('goodsInfo') goodsInfo,
    @Param('quantity') quantity,
  ) {
    try {
      return await this.goodsLocationService.subtractGoods(goodsInfo, quantity);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBody({ type: CreateGoodsLocationDto })
  @Post()
  async create(@Body() goodsLocationDto: CreateGoodsLocationDto) {
    try {
      return await this.goodsLocationService.create(goodsLocationDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBody({ type: CreateGoodsLocationDto })
  @Put(':id')
  async update(
    @Body() goodsLocationDto: CreateGoodsLocationDto,
    @Param('id') id,
  ) {
    try {
      return await this.goodsLocationService.update(id, goodsLocationDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get()
  async getList() {
    return await this.goodsLocationService.getList();
  }

  @Get(':id')
  async getOne(@Param('id') id) {
    return await this.goodsLocationService.getOne(id);
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'goods id',
  })
  @Delete(':id')
  async delete(@Param('id') id) {
    await this.goodsLocationService.delete(id);
  }
}
