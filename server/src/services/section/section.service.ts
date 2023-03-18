import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SectionEntity } from '../../entities/section.entity';
import { CreateSectionDto } from '../../dto/create-section.dto';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(SectionEntity)
    private sectionRepository: Repository<SectionEntity>,
  ) {}

  async create(sectionDto: CreateSectionDto) {
    const entity = this.sectionRepository.create(sectionDto);
    return await this.sectionRepository.save(entity);
  }

  async getList() {
    return await this.sectionRepository.find();
  }

  async getOne(id: number) {
    const section = await this.sectionRepository.findOneBy({ id });
    return section;
  }

  async update(id: number, sectionDto: CreateSectionDto) {
    const section = await this.sectionRepository.findOneBy({ id });

    if (section == null) {
      // throw new GoodsNotFoundError(id);
    }
    await this.sectionRepository.save({ ...section, ...sectionDto });
  }

  async delete(id: number) {
    const section = await this.sectionRepository.findOneBy({ id });
    if (section) {
      return await this.sectionRepository.remove(section);
    }
    return null;
  }
}
