import { Organisation } from 'src/organisations/organisation.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne  } from 'typeorm';

@Entity()
export class FeatureFlag {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @ManyToOne(
    () => Organisation,
    (organisation: Organisation) => organisation.featureFlags,
  )
  public organisation: number;
}