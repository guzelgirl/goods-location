import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SizeEntity } from '../../entities/size.entity';
import { CreateSizeDto } from '../../dto/create-size.dto';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(SizeEntity)
    private sizeRepository: Repository<SizeEntity>,
  ) {}

  async create(sizeDto: CreateSizeDto) {
    const entity = this.sizeRepository.create(sizeDto);
    return await this.sizeRepository.save(entity);
  }

  async getList() {
    return await this.sizeRepository.find();
  }

  async getOne(id: number) {
    const size = await this.sizeRepository.findOneBy({ id });
    return size;
  }

  async update(id: number, sizeDto: CreateSizeDto) {
    const size = await this.sizeRepository.findOneBy({ id });

    if (size == null) {
      // throw new GoodsNotFoundError(id);
    }
    await this.sizeRepository.save({ ...size, ...sizeDto });
  }

  async delete(id: number) {
    const size = await this.sizeRepository.findOneBy({ id });
    if (size) {
      return await this.sizeRepository.delete(size);
    }
    return null;
  }
}
