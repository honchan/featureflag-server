import { Body, Controller, Post } from '@nestjs/common';

import { OrganisationsService } from './organisations.service'
import { CreateOrganisationDto } from './dto/createOrganisation.dto';

@Controller('organisations')
export class OrganisationsController {
  constructor(private readonly organisationsService: OrganisationsService) {}

  @Post()
  async createOrganisation(@Body() organisation: CreateOrganisationDto) {
    return this.organisationsService.createOrganisation(organisation);
  }
}
