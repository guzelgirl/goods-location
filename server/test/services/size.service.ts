import request from 'supertest';
import { SIZE_URL } from '../conts';

export class SizeService {
  private HOST = null;

  setHost(host: any) {
    this.HOST = host;
  }

  async getList() {
    const response = await request(this.HOST).get(SIZE_URL);
    return response.body.data;
  }

  async getOne(id: number) {
    const response = await request(this.HOST).get(`${SIZE_URL}/${id}`);
    return response.body.data;
  }

  async createOne(dto: any) {
    const response = await request(this.HOST).post(SIZE_URL).send(dto);
    return response.body.data;
  }

  async updateOne(id: number, dto: any) {
    const response = await request(this.HOST)
      .put(`${SIZE_URL}/${id}`)
      .send(dto);
    return response.body.data;
  }

  async deleteOne(id: number) {
    const response = await request(this.HOST)
      .delete(`${SIZE_URL}/${id}`)
      .send();
    return response.body.data;
  }
}

export const sizeService = new SizeService();
