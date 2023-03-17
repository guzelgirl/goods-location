import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StillageEntity } from '../../entities/stillage.entity';
import { CreateStillageDto } from '../../dto/create-stillage.dto';

@Injectable()
export class StillageService {
  constructor(
    @InjectRepository(StillageEntity)
    private stillageRepository: Repository<StillageEntity>,
  ) {}

  async create(stillageDto: CreateStillageDto) {
    const entity = this.stillageRepository.create(stillageDto);
    return await this.stillageRepository.save(entity);
  }

  async getList() {
    return await this.stillageRepository.find();
  }

  async getOne(id: number) {
    const stillage = await this.stillageRepository.findOneBy({ id });
    return stillage;
  }

  async update(id: number, stillageDto: CreateStillageDto) {
    const stillage = await this.stillageRepository.findOneBy({ id });

    if (stillage == null) {
      // throw new GoodsNotFoundError(id);
    }
    await this.stillageRepository.save({ ...stillage, ...stillageDto });
  }

  async delete(id: number) {
    const stillage = await this.stillageRepository.findOneBy({ id });
    if (stillage) {
      return await this.stillageRepository.delete(stillage);
    }
    return null;
  }
}
