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
import { CreateGoodsDto } from '../../dto/create-goods.dto';
import { GoodsNotFoundError } from '../../errors/goods.error';
import { GoodsService } from './goods.service';

@ApiTags('goods')
@Controller('api/goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @ApiBody({ type: CreateGoodsDto })
  @Post()
  async createOne(@Body() goodsDto: CreateGoodsDto) {
    console.log('goodsDto', goodsDto);
    return await this.goodsService.create(goodsDto);
  }

  @Get()
  async getList() {
    return await this.goodsService.getList();
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'goods id',
  })
  @ApiResponse({ status: 500, description: 'Unexpected server error' })
  @Get(':id')
  async getOne(@Param('id') id) {
    return await this.goodsService.getOne(id);
  }

  @ApiBody({ type: CreateGoodsDto })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'goods id',
  })
  @Put(':id')
  async update(@Body() goodsDto: CreateGoodsDto, @Param('id') id) {
    try {
      await this.goodsService.update(id, goodsDto);
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
  @Delete(':id')
  async delete(@Param('id') id) {
    await this.goodsService.delete(id);
  }
}
