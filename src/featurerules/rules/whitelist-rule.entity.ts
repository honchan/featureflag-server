import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity()
export class WhitelistFeatureRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Expose()
  type: string;

  @Column()
  priority: number;

  @Column()
  @Expose()
  enabled: boolean;

  @Column('text', { array: true })
  @Expose()
  onList: string[];

  @Column('text', { array: true })
  @Expose()
  offList: string[];
}
