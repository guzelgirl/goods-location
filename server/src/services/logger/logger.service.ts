import { Injectable } from '@nestjs/common';
import { DataSource, LogLevel } from 'typeorm';

@Injectable()
export class LoggerService {
  constructor(private readonly dataSource: DataSource) {}

  async queryInfo(queryStr: string, params?: object) {
    const message = `query: ${queryStr}, params: ${
      params ? JSON.stringify(params) : ''
    }`;
    await this.writeLog('query', message);
  }

  async queryError(error: string) {
    await this.writeLog('error', error);
  }

  private async writeLog(level: LogLevel, message) {
    await this.dataSource.query(
      `
    insert into log_entity (level, message) values (?, ?)`,
      [level, message],
    );
  }
}
