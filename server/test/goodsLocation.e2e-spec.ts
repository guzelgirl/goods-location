import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { GOODS_LOCATION_URL } from './conts';
import { GoodsService } from '../src/services/goods/goods.service';
import { SizeService } from '../src/services/size/size.service';
import { SectionService } from '../src/services/section/section.service';
import { StillageService } from '../src/services/stillage/stillage.service';

describe('Goods location testing', () => {
  let app: INestApplication;
  let goodsService: GoodsService;
  let sizeService: SizeService;
  let sectionService: SectionService;
  let stillageService: StillageService;
  let HOST = null;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    goodsService = app.get(GoodsService);
    sizeService = app.get(SizeService);
    sectionService = app.get(SectionService);
    stillageService = app.get(StillageService);

    await app.init();
    HOST = app.getHttpServer();
  });

  describe('CRUD', () => {
    let goods = null;
    let size = null;
    let section = null;
    let stillage = null;
    let locationInfo = null;
    let goodsInfo = null;
    let id = null;

    beforeAll(async () => {
      goods = await goodsService.create({ name: 'test_goods' });
      size = await sizeService.create({ name: 'XS' });
      section = await sectionService.create({ name: 'AD' });
      stillage = await stillageService.create({ name: '11' });

      locationInfo = `${stillage.name}-${section.name}`;
      goodsInfo = `L${goods.id} S${size.name}`;
    });

    afterAll(async () => {
      await goodsService.delete(goods.id);
      await sizeService.delete(size.id);
      await sectionService.delete(section.id);
      await stillageService.delete(stillage.id);
    });

    it(`/POST add new location`, async () => {
      const goodsLocationDto = { locationInfo, goodsInfo };
      const { status, body } = await request(HOST)
        .post(`${GOODS_LOCATION_URL}/add`)
        .send(goodsLocationDto);

      expect(status).toEqual(201);
      expect(body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          goodsId: goods.id,
          sizeId: size.id,
          sectionId: section.id,
          stillageId: stillage.id,
          quantity: 1,
        }),
      );
      id = body.id;
    });

    it(`/POST add to existing location`, async () => {
      const goodsLocationDto = { locationInfo, goodsInfo };
      const { status, body } = await request(HOST)
        .post(`${GOODS_LOCATION_URL}/add`)
        .send(goodsLocationDto);

      expect(status).toEqual(201);
      expect(body).toEqual(
        expect.objectContaining({
          id,
          goodsId: goods.id,
          sizeId: size.id,
          sectionId: section.id,
          stillageId: stillage.id,
          quantity: 2,
        }),
      );
    });

    it(`/GET location by goods info`, async () => {
      const quantity = 1;

      const { status, body } = await request(HOST).get(
        `${GOODS_LOCATION_URL}/${goodsInfo}/${quantity}`,
      );

      expect(status).toEqual(200);
      expect(body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id,
            goodsId: goods.id,
            goods: goods.name,
            sizeId: size.id,
            size: size.name,
            sectionId: section.id,
            section: section.name,
            stillageId: stillage.id,
            stillage: stillage.name,
            quantity: 2,
            need_quantity: 1,
            rest: 1,
          }),
        ]),
      );
    });

    it(`/PUT substract goods from location`, async () => {
      const quantity = 1;

      const { status, body } = await request(HOST).put(
        `${GOODS_LOCATION_URL}/substract/${goodsInfo}/${quantity}`,
      );

      expect(status).toEqual(200);
      expect(body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id,
            goodsId: goods.id,
            sizeId: size.id,
            sectionId: section.id,
            stillageId: stillage.id,
            quantity: 1,
          }),
        ]),
      );
    });

    it(`/DELETE location by goods info`, async () => {
      const { status } = await request(HOST).delete(
        `${GOODS_LOCATION_URL}/${id}`,
      );
      expect(status).toEqual(200);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
