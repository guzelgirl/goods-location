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
import { CreateStillageDto } from '../../dto/create-stillage.dto';
import { StillageService } from './stillage.service';

@ApiTags('stillage')
@Controller('api/stillage')
export class StillageController {
  constructor(private readonly stillageService: StillageService) {}

  @ApiBody({ type: CreateStillageDto })
  @Post()
  async createOne(@Body() stillageDto: CreateStillageDto) {
    return await this.stillageService.create(stillageDto);
  }

  @Get()
  async getList() {
    return await this.stillageService.getList();
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'stillage id',
  })
  @ApiResponse({ status: 500, description: 'Unexpected server error' })
  @Get(':id')
  async getOne(@Param('id') id) {
    return await this.stillageService.getOne(id);
  }

  @ApiBody({ type: CreateStillageDto })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'stillage id',
  })
  @Put(':id')
  async update(@Body() stillageDto: CreateStillageDto, @Param('id') id) {
    await this.stillageService.update(id, stillageDto);
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'section id',
  })
  @Delete(':id')
  async delete(@Param('id') id) {
    await this.stillageService.delete(id);
  }
}
