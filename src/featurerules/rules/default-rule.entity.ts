import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DefaultFeatureRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  priority: number;

  @Column()
  enabled: boolean;
}
