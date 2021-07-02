import { Organisation } from '../../organisations/organisation.entity';

export interface CreateUserDto {
  name: string;
  organisation: number;
}
