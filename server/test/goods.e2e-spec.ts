import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { GOODS_URL } from './conts';

describe('Goods', () => {
  let app: INestApplication;

  const goodsName = 'test_goods';
  let goodId = null;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  it(`/POST`, async () => {
    const { status, body } = await request(app.getHttpServer())
      .post(GOODS_URL)
      .send({ name: goodsName });

    expect(status).toEqual(201);
    expect(body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: goodsName,
      }),
    );
    goodId = body.id;
  });

  it(`/GET`, async () => {
    const { status, body } = await request(app.getHttpServer()).get(GOODS_URL);
    expect(status).toEqual(200);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
        }),
      ]),
    );
  });

  it(`/GET One`, async () => {
    const { status, body } = await request(app.getHttpServer()).get(
      `${GOODS_URL}/${goodId}`,
    );
    expect(status).toEqual(200);
    expect(body).toEqual(
      expect.objectContaining({
        id: goodId,
        name: goodsName,
      }),
    );
  });

  it(`/PUT`, async () => {
    const newGoodsName = 'test_goods_1';

    const { status, body } = await request(app.getHttpServer())
      .put(`${GOODS_URL}/${goodId}`)
      .send({ name: newGoodsName });

    expect(status).toEqual(200);
    expect(body).toEqual(
      expect.objectContaining({
        id: goodId,
        name: newGoodsName,
      }),
    );
  });

  it(`/DELETE`, async () => {
    const { status } = await request(app.getHttpServer()).delete(
      `${GOODS_URL}/${goodId}`,
    );
    expect(status).toEqual(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
