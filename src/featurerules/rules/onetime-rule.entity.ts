import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class OnetimeFeatureRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  priority: number;

  @Column()
  enabled: boolean;

  @Column('text', { array: true })
  blocked: string[];
}
