import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoodsEntity } from '../../entities/goods.entity';
import { GoodsLocationEntity } from '../../entities/goodsLocation.entity';
import { SectionEntity } from '../../entities/section.entity';
import { SizeEntity } from '../../entities/size.entity';
import { StillageEntity } from '../../entities/stillage.entity';
import { Repository } from 'typeorm';
import { goodsMock } from './mocks/goods.mock';
import { sectionMock } from './mocks/section.mock';
import { stillageMock } from './mocks/stillage.mock';
import { sizeMock } from './mocks/size.mock';

@Injectable()
export class PopulateService {
  constructor(
    @InjectRepository(GoodsEntity)
    private goodsRepository: Repository<GoodsEntity>,
    @InjectRepository(GoodsLocationEntity)
    private goodsLocationRepository: Repository<GoodsLocationEntity>,
    @InjectRepository(SectionEntity)
    private sectionRepository: Repository<SectionEntity>,
    @InjectRepository(StillageEntity)
    private stillageRepository: Repository<StillageEntity>,
    @InjectRepository(SizeEntity)
    private sizeRepository: Repository<SizeEntity>,
  ) {}

  async populate() {
    await this.populateSize();
    await this.populateStillage();
    await this.populateSection();
    await this.populateGoods();
    await this.populateGoodsLocation();
  }

  async depopulate() {
    await this.depopulateGoodsLocation();
    await this.depopulateGoods();
    await this.depopulateSize();
    await this.depopulateStillage();
    await this.depopulateSection();
  }

  private async populateSize() {
    const [size] = await this.sizeRepository.find();
    if (!size) {
      for (const sm of sizeMock) {
        const sizeEntity = this.sizeRepository.create(sm);
        await this.sizeRepository.save(sizeEntity);
      }
    }
  }

  private async depopulateSize() {
    const sizes = await this.sizeRepository.find();
    await this.sizeRepository.remove(sizes);
  }

  private async populateStillage() {
    const [stillage] = await this.stillageRepository.find();
    if (!stillage) {
      for (const sm of stillageMock) {
        const stillageEntity = this.stillageRepository.create(sm);
        await this.stillageRepository.save(stillageEntity);
      }
    }
  }

  private async depopulateStillage() {
    const data = await this.stillageRepository.find();
    await this.stillageRepository.remove(data);
  }

  private async populateSection() {
    const [section] = await this.sectionRepository.find();
    if (!section) {
      for (const sm of sectionMock) {
        const sectionEntity = this.sectionRepository.create(sm);
        await this.sectionRepository.save(sectionEntity);
      }
    }
  }

  private async depopulateSection() {
    const sections = await this.sectionRepository.find();
    await this.sectionRepository.remove(sections);
  }

  private async populateGoods() {
    const [goods] = await this.goodsRepository.find();

    if (!goods) {
      for (const gm of goodsMock) {
        const goodsEntity = this.goodsRepository.create(gm);
        await this.goodsRepository.save(goodsEntity);
      }
    }
  }

  private async depopulateGoods() {
    const goods = await this.goodsRepository.find();
    await this.goodsRepository.remove(goods);
  }

  private async populateGoodsLocation() {
    const [goodsLocation] = await this.goodsLocationRepository.find();

    if (!goodsLocation) {
      const stillages = await this.stillageRepository.find();
      const sections = await this.sectionRepository.find();
      const goods = await this.goodsRepository.find();
      const sizes = await this.sizeRepository.find();

      for (const g of [...goods, ...goods, ...goods, ...goods, ...goods]) {
        const stillageIndex = this.getIndex(stillages.length);
        const sectionIndex = this.getIndex(sections.length);
        const sizeIndex = this.getIndex(sizes.length);

        const location = new GoodsLocationEntity();
        location.goodsId = g.id;
        location.sizeId = sizes[sizeIndex].id;
        location.stillageId = stillages[stillageIndex].id;
        location.sectionId = sections[sectionIndex].id;
        location.quantity = this.getIndex(10);

        await this.goodsLocationRepository.save(location);
      }
    }
  }

  private async depopulateGoodsLocation() {
    const goodsLocations = await this.goodsLocationRepository.find();
    await this.goodsLocationRepository.remove(goodsLocations);
  }

  private getIndex(length: number) {
    return Math.floor(Math.random() * length);
  }
}
