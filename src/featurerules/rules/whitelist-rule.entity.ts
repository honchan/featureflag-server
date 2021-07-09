import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class WhitelistFeatureRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  priority: number;

  @Column()
  enabled: boolean;

  @Column('text', { array: true })
  onList: string[];

  @Column('text', { array: true })
  offList: string[];
}
