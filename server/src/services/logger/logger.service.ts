import { dataSource } from '../../data-source';
import { Injectable } from '@nestjs/common';
import { LogLevel } from 'typeorm';

@Injectable()
export class LoggerService {
  async queryInfo(queryStr: string, params?: object) {
    const message = `query: ${queryStr}, params: ${
      params ? params.toString() : ''
    }`;
    await this.writeLog('query', message);
  }

  async queryError(error: string) {
    console.log('error', error);
    await this.writeLog('error', error);
  }

  private async writeLog(level: LogLevel, message) {
    await dataSource.query(
      `
    insert into log_entity (level, message) values (:level, :message)`,
      [level, message],
    );
  }
}
