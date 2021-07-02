import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../users/user.entity';
import { FeatureFlag } from '../featureflags/featureflag.entity';

@Entity()
export class Organisation {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @OneToMany(() => User, (user: User) => user.id)
  public users: User[];

  @OneToMany(() => FeatureFlag, (featureFlag: FeatureFlag) => featureFlag.id)
  public featureFlags: FeatureFlag[];
}
