import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { GoodsLocationEntity } from './goodsLocation.entity';

@Entity()
export class GoodsEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @OneToMany(
    () => GoodsLocationEntity,
    (goodsLocation) => goodsLocation.goods,
    { nullable: false },
  )
  goodsLocation: GoodsLocationEntity[];
}
