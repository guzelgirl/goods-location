import request from 'supertest';
import { SECTION_URL } from '../conts';

export class SectionService {
  private HOST = null;

  setHost(host: any) {
    this.HOST = host;
  }

  async getList() {
    const response = await request(this.HOST).get(SECTION_URL);
    return response.body.data;
  }

  async getOne(id: number) {
    const response = await request(this.HOST).get(`${SECTION_URL}/${id}`);
    return response.body.data;
  }

  async createOne(dto: any) {
    const response = await request(this.HOST).post(SECTION_URL).send(dto);
    return response.body.data;
  }

  async updateOne(id: number, dto: any) {
    const response = await request(this.HOST)
      .put(`${SECTION_URL}/${id}`)
      .send(dto);
    return response.body.data;
  }

  async deleteOne(id: number) {
    const response = await request(this.HOST)
      .delete(`${SECTION_URL}/${id}`)
      .send();
    return response.body.data;
  }
}

export const sectionService = new SectionService();
