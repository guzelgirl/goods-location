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
import { CreateSectionDto } from '../../dto/create-section.dto';
import { SectionService } from './section.service';

@ApiTags('section')
@Controller('api/section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @ApiBody({ type: CreateSectionDto })
  @Post()
  async createOne(@Body() sectionDto: CreateSectionDto) {
    return await this.sectionService.create(sectionDto);
  }

  @Get()
  async getList() {
    return await this.sectionService.getList();
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'section id',
  })
  @ApiResponse({ status: 500, description: 'Unexpected server error' })
  @Get(':id')
  async getOne(@Param('id') id) {
    return await this.sectionService.getOne(id);
  }

  @ApiBody({ type: CreateSectionDto })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'section id',
  })
  @Put(':id')
  async update(@Body() sectionDto: CreateSectionDto, @Param('id') id) {
    await this.sectionService.update(id, sectionDto);
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'section id',
  })
  @Delete(':id')
  async delete(@Param('id') id) {
    await this.sectionService.delete(id);
  }
}
