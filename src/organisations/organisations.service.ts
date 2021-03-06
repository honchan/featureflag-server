import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Organisation } from './organisation.entity';
import { CreateOrganisationDto } from './dto/createOrganisation.dto';

@Injectable()
export class OrganisationsService {
  constructor(
    @InjectRepository(Organisation)
    private readonly organisationsRepository: Repository<Organisation>,
  ) {}

  async createOrganisation(organisation: CreateOrganisationDto) {
    const newOrganisation = await this.organisationsRepository.create(organisation);
    await this.organisationsRepository.save(newOrganisation);
    return newOrganisation;
  }

  listOrganisations() {
    return this.organisationsRepository.find();
  }
}
