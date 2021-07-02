import { Column, Entity, OneToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

import { User } from '../users/user.entity';

@Entity()
export class Organisation {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @OneToMany(() => User, (user: User) => user.id)
  public users: User[];
}
