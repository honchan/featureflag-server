import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { OrganisationsModule } from './organisations/organisations.module';

@Module({
  imports: [DatabaseModule, OrganisationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
