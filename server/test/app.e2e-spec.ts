import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { goodsService } from './services/goods.service';
import { sizeService } from './services/size.service';
import { sectionService } from './services/section.service';
import { stillageService } from './services/stillage.service';
import { HOSTNAME, GOODS_LOCATION_URL } from './conts';

describe('GoodsLocation controller (e2e)', () => {
  let app: INestApplication;
  let HOST = null;

  let goods = null;
  let stillage = null;
  let section = null;
  let size = null;
  let goodsLocation = null;

  let locationInfo = null;
  let goodsInfo = null;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    HOST = app.getHttpServer();
    goodsService.setHost(HOST);
    sizeService.setHost(HOST);
    sectionService.setHost(HOST);
    stillageService.setHost(HOST);

    const goodsList = await goodsService.getList();
    console.log('goodsList', goodsList);

    goods = await goodsService.createOne({ name: 'test_goods' });
    size = await sizeService.createOne({ name: 'XS' });
    stillage = await stillageService.createOne({ name: 'AD' });
    section = await sectionService.createOne({ name: '11' });

    locationInfo = `${stillage.name}-${section.name}`;
    goodsInfo = `L${goods.id} S${size.name}`;
  });

  afterAll(async () => {
    await goodsService.deleteOne(goods.id);
    await sizeService.deleteOne(size.id);
    await stillageService.deleteOne(stillage.id);
    await sectionService.deleteOne(section.id);
  });

  it('Create location /api/goodsLocation (POST)', async () => {
    const { status, body } = await request(HOST).post(GOODS_LOCATION_URL).send({
      locationInfo,
      goodsInfo,
    });
    expect(status).toEqual(201);
    goodsLocation = body;

    console.log('goodsLocation', goodsLocation);
  });

  it('Get locations /api/goodsLocation (GET)', async () => {
    return request(HOST).get(GOODS_LOCATION_URL).expect(200);
  });

  it('/ (GET)', () => {
    return request(HOST).get('/').expect(200).expect('Hello World!');
  });
});
