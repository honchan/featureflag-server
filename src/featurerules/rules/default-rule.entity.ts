import { Expose } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DefaultFeatureRule {
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
}
