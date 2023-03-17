import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { GoodsEntity } from './goods.entity';
import { SectionEntity } from './section.entity';
import { SizeEntity } from './size.entity';
import { StillageEntity } from './stillage.entity';

@Entity()
export class GoodsLocationEntity extends BaseEntity {
  @Column({ type: 'int', nullable: false })
  goodsId: number;

  @Column({ type: 'int', nullable: false })
  stillageId: number;

  @Column({ type: 'int', nullable: false })
  sectionId: number;

  @Column({ type: 'int', nullable: true })
  sizeId: number;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @ManyToOne(() => GoodsEntity, (goods) => goods.id, { nullable: false })
  @JoinColumn({ name: 'goodsId' })
  goods: GoodsEntity;

  @ManyToOne(() => StillageEntity, (stillage) => stillage.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'stillageId' })
  stillage: StillageEntity;

  @ManyToOne(() => SectionEntity, (section) => section.id, { nullable: false })
  @JoinColumn({ name: 'sectionId' })
  section: SectionEntity;

  @ManyToOne(() => SizeEntity, (size) => size.id, { nullable: true })
  @JoinColumn({ name: 'sizeId' })
  size: SizeEntity;
}
