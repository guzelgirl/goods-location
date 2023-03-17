import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGoodsDto } from '../../dto/create-goods.dto';
import { GoodsEntity } from '../../entities/goods.entity';
import { Repository } from 'typeorm';
import { GoodsNotFoundError } from '../../errors/goods.error';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(GoodsEntity)
    private goodsRepository: Repository<GoodsEntity>,
  ) {}

  async create(goodsDto: CreateGoodsDto) {
    const goods = this.goodsRepository.create(goodsDto);
    return await this.goodsRepository.save(goods);
  }

  async getList() {
    return await this.goodsRepository.find();
  }

  async getOne(id: number) {
    const goods = await this.goodsRepository.findOneBy({ id });
    return goods;
  }

  async update(id: number, goodsDto: CreateGoodsDto) {
    const goods = await this.goodsRepository.findOneBy({ id });

    if (goods == null) {
      throw new GoodsNotFoundError(id);
    }
    await this.goodsRepository.save({ ...goods, ...goodsDto });
  }

  async delete(id: number) {
    const goods = await this.goodsRepository.findOneBy({ id });
    if (goods) {
      return await this.goodsRepository.delete(goods);
    }
    return null;
  }
}
