import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { FeatureFlag } from '../featureflags/featureflag.entity';

@Entity()
export class Organisation {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @OneToMany(() => FeatureFlag, (featureFlag: FeatureFlag) => featureFlag.id)
  public featureFlags: FeatureFlag[];
}
