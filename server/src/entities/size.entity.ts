import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { GoodsLocationEntity } from './goodsLocation.entity';

@Entity()
export class SizeEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @OneToMany(() => GoodsLocationEntity, (goodsLocation) => goodsLocation.size, {
    nullable: false,
  })
  goodsLocation: GoodsLocationEntity[];
}
