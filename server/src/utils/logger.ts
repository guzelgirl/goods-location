import {
  LogLevel,
  LogMessage,
  QueryRunner,
  AbstractLogger,
  LoggerOptions,
  PrepareLogMessagesOptions,
  Logger,
} from 'typeorm';
import { LogEntity } from '../entities/log.entity';

export class CustomLogger implements Logger {
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): void {
    console.log('logQuery');
    // const message = `${query}; parameters: ${parameters ? parameters : {}}`;
    // console.log(`level: query, message: ${message}`);
  }

  logQueryError(
    error: string,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ): void {
    console.log('logQueryError');
    // throw new Error('Method not implemented.');
  }
  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ): void {
    console.log('logQuerySlow');
    // throw new Error('Method not implemented.');
  }
  logSchemaBuild(message: string, queryRunner?: QueryRunner): void {
    console.log('logSchemaBuild');
    // throw new Error('Method not implemented.');
  }
  logMigration(message: string, queryRunner?: QueryRunner): void {
    console.log('logMigration');
    // throw new Error('Method not implemented.');
  }
  log(
    level: 'warn' | 'info' | 'log',
    message: any,
    queryRunner?: QueryRunner,
  ): void {
    console.log('log', level, message);
    // throw new Error('Method not implemented.');
  }

  protected async writeLog(
    level: LogLevel,
    message: string,
    queryRunner?: QueryRunner,
  ) {
    await queryRunner.query(
      `
        insert into log_entity (level, message) values (:level, :message)`,
      [level, message],
    );
  }
}
