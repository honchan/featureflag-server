import { Organisation } from '../organisations/organisation.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @ManyToOne(
    () => Organisation,
    (organisation: Organisation) => organisation.users,
  )
  public organisationId: number;
}
