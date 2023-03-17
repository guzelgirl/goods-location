import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class LogEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  level: string;

  @Column({ type: 'varchar', nullable: false })
  message: string;
}
