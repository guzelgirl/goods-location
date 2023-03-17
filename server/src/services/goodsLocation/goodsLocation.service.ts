import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGoodsDto } from '../../dto/create-goods.dto';
import { GoodsEntity } from '../../entities/goods.entity';
import { Repository } from 'typeorm';
import { GoodsNotFoundError } from '../../errors/goods.error';
import { GoodsLocationEntity } from '../../entities/goodsLocation.entity';
import { CreateGoodsLocationDto } from '../../dto/create-goods-location.dto';
import { SizeEntity } from '../../entities/size.entity';
import { StillageEntity } from '../../entities/stillage.entity';
import { SectionEntity } from '../../entities/section.entity';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class GoodsLocationService {
  constructor(
    @InjectRepository(GoodsEntity)
    private goodsRepository: Repository<GoodsEntity>,
    @InjectRepository(GoodsLocationEntity)
    private goodsLocationRepository: Repository<GoodsLocationEntity>,
    @InjectRepository(SizeEntity)
    private sizeRepository: Repository<SizeEntity>,
    @InjectRepository(StillageEntity)
    private stillageRepository: Repository<StillageEntity>,
    @InjectRepository(SectionEntity)
    private sectionRepository: Repository<SectionEntity>,
    private readonly logger: LoggerService,
  ) {}

  async create(
    goodsLocationDto: CreateGoodsLocationDto,
  ): Promise<GoodsLocationEntity> {
    const { goodsInfo, locationInfo } = goodsLocationDto;

    const [stillageName, sectionName] = locationInfo.split('-');
    const [goodsIdInfo, sizeInfo] = goodsInfo.split(' ');

    if (goodsIdInfo.indexOf('L') == -1) {
      throw new Error('no goods id');
    }
    const goodsId = Number(goodsIdInfo.slice(goodsIdInfo.indexOf('L') + 1));

    const goods = await this.goodsRepository.findOneBy({ id: goodsId });

    if (goods == null) {
      throw new GoodsNotFoundError(goodsId);
    }

    if (sizeInfo.indexOf('S') == -1) {
      throw new Error('no size info');
    }
    const sizeName = sizeInfo.slice(sizeInfo.indexOf('S') + 1);
    const size = await this.sizeRepository.findOneBy({ name: sizeName });

    if (size == null) {
      throw new Error(`Size (${sizeName}) is not found`);
    }

    const stillage = await this.stillageRepository.findOneBy({
      name: stillageName,
    });
    if (stillage == null) {
      throw new Error(`Section (${stillageName}) is not found`);
    }

    const section = await this.sectionRepository.findOneBy({
      name: sectionName,
    });
    if (section == null) {
      throw new Error(`Section (${sectionName}) is not found`);
    }

    const currentLocation = await this.goodsLocationRepository.findOneBy({
      goodsId,
      stillageId: stillage.id,
      sectionId: section.id,
      sizeId: size.id,
    });

    let result: GoodsLocationEntity;

    if (currentLocation) {
      currentLocation.quantity += 1;
      result = await this.goodsLocationRepository.save(currentLocation);
    } else {
      const newLocation = new GoodsLocationEntity();
      newLocation.goods = goods;
      newLocation.section = section;
      newLocation.stillage = stillage;
      newLocation.size = size;
      newLocation.quantity = 1;
      result = await this.goodsLocationRepository.save(newLocation);
    }

    return result;
  }

  async getLocation(goodsInfo: string, quantity: number) {
    const [goodsIdInfo, sizeInfo] = goodsInfo.split(' ');

    if (goodsIdInfo.indexOf('L') == -1) {
      throw new Error('no goods id');
    }
    const goodsId = Number(goodsIdInfo.slice(goodsIdInfo.indexOf('L') + 1));

    const goods = await this.goodsRepository.findOneBy({ id: goodsId });

    if (goods == null) {
      throw new GoodsNotFoundError(goodsId);
    }

    if (sizeInfo.indexOf('S') == -1) {
      throw new Error('no size info');
    }
    const sizeName = sizeInfo.slice(sizeInfo.indexOf('S') + 1);
    const size = await this.sizeRepository.findOneBy({ name: sizeName });

    if (size == null) {
      throw new Error(`Size (${sizeName}) is not found`);
    }

    const query = `
      with tab1 as (
      select id, goodsId, stillageId, sectionId, quantity, sizeId
      from goods_location_entity
      where goodsId = ${goodsId} and sizeId = ${size.id}
      ),
      tab2 as (
      select *, ROW_NUMBER() OVER (order by quantity) as rn
      from tab1
      ),
      tab3 as (
      select *,
      (select sum(quantity) from tab2 t where t.rn <= tab2.rn) as cumulated_q
      from tab2
      order by rn
      ),
      tab4 as (
      select *, 
      (cumulated_q - ${quantity}) as dif, 
      (LAG(cumulated_q, 1, 0) OVER (ORDER BY rn )) - ${quantity} dif_lag
      from tab3
      ),
      tab5 as (
      select id, goodsId, stillageId, sectionId, quantity, sizeId,
      case when dif <= 0 then quantity else -dif_lag end need_quantity,
      case when dif <= 0 then 0 else quantity + dif_lag end rest
      from tab4
      where dif_lag <= 0
      )
      
      select g.id, g.name goods, sz.name size, st.name stillage, sc.name section, quantity, need_quantity, rest
      from tab5 t
      left join size_entity sz on t.sizeId = sz.id
      left join stillage_entity st on t.stillageId = st.id
      left join section_entity sc on t.sectionId = sc.id
      left join goods_entity g on t.goodsId = g.id
    `;
    const data = await this.goodsLocationRepository.query(query);
    return data;
  }

  async getList() {
    const list = await this.goodsLocationRepository.find();
    return list;
  }

  async getOne(id: number) {
    const goods = await this.goodsLocationRepository.findOne({
      where: { goodsId: id },
      relations: {
        section: true,
        stillage: true,
        size: true,
      },
    });
    return goods;
  }

  async update(id: number, goodsDto: CreateGoodsDto) {
    const goods = await this.goodsRepository.findOneBy({ id });

    if (goods == null) {
      throw new GoodsNotFoundError(id);
    }

    await this.goodsRepository.update(
      id,
      this.goodsRepository.create(goodsDto),
    );
  }

  async delete(id: number) {
    const goods = await this.goodsRepository.findOneBy({ id });
    if (goods) {
      return await this.goodsRepository.delete(goods);
    }
    return null;
  }
}
