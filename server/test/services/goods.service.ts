import request from 'supertest';
import { GOODS_URL } from '../conts';

export class GoodsService {
  private HOST = null;

  setHost(host: any) {
    this.HOST = host;
  }

  async getList() {
    const response = await request(this.HOST).get(GOODS_URL);
    return response.body.data;
  }

  async getOne(id: number) {
    const response = await request(this.HOST).get(`${GOODS_URL}/${id}`);
    return response.body.data;
  }

  async createOne(dto: any) {
    const response = await request(this.HOST).post(GOODS_URL).send(dto);
    return response.body.data;
  }

  async updateOne(id: number, dto: any) {
    const response = await request(this.HOST)
      .put(`${GOODS_URL}/${id}`)
      .send(dto);
    return response.body.data;
  }

  async deleteOne(id: number) {
    const response = await request(this.HOST)
      .delete(`${GOODS_URL}/${id}`)
      .send();
    return response.body.data;
  }
}
export const goodsService = new GoodsService();
