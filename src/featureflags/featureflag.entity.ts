import { DefaultFeatureRule } from 'src/featurerules/default-rule.entity';
import { Organisation } from 'src/organisations/organisation.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

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

  @OneToOne(() => DefaultFeatureRule)
  @JoinColumn()
  public defaultFeatureRule: DefaultFeatureRule;
}