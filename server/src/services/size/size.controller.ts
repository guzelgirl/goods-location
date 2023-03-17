import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSizeDto } from '../../dto/create-size.dto';
import { SizeService } from './size.service';

@ApiTags('size')
@Controller('api/size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @ApiBody({ type: CreateSizeDto })
  @Post()
  async createOne(@Body() sizeDto: CreateSizeDto) {
    return await this.sizeService.create(sizeDto);
  }

  @Get()
  async getList() {
    return await this.sizeService.getList();
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'size id',
  })
  @ApiResponse({ status: 500, description: 'Unexpected server error' })
  @Get(':id')
  async getOne(@Param('id') id) {
    return await this.sizeService.getOne(id);
  }

  @ApiBody({ type: CreateSizeDto })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'size id',
  })
  @Put(':id')
  async update(@Body() sizeDto: CreateSizeDto, @Param('id') id) {
    await this.sizeService.update(id, sizeDto);
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'size id',
  })
  @Delete(':id')
  async delete(@Param('id') id) {
    await this.sizeService.delete(id);
  }
}
