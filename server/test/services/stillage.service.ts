import request from 'supertest';
import { STILLAGE_URL } from '../conts';

export class StillageService {
  private HOST = null;

  setHost(host: any) {
    this.HOST = host;
  }

  async getList() {
    const response = await request(this.HOST).get(STILLAGE_URL);
    return response.body.data;
  }

  async getOne(id: number) {
    const response = await request(this.HOST).get(`${STILLAGE_URL}/${id}`);
    return response.body.data;
  }

  async createOne(dto: any) {
    const response = await request(this.HOST).post(STILLAGE_URL).send(dto);
    return response.body.data;
  }

  async updateOne(id: number, dto: any) {
    const response = await request(this.HOST)
      .put(`${STILLAGE_URL}/${id}`)
      .send(dto);
    return response.body.data;
  }

  async deleteOne(id: number) {
    const response = await request(this.HOST)
      .delete(`${STILLAGE_URL}/${id}`)
      .send();
    return response.body.data;
  }
}

export const stillageService = new StillageService();
