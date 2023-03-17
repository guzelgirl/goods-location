import { Controller, Delete, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PopulateService } from './populate.service';

@ApiTags('populate')
@Controller('api')
export class PopulateController {
  constructor(private readonly populateService: PopulateService) {}

  @Post('populate')
  async populate(): Promise<any> {
    return await this.populateService.populate();
  }

  @Delete('depopulate')
  async depopulate(): Promise<any> {
    return await this.populateService.depopulate();
  }
}
