import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { OrganisationsModule } from './organisations/organisations.module';
import { FeatureFlagsModule } from './featureflags/featureflags.module'

@Module({
  imports: [
    ConfigModule.forRoot({}),
    DatabaseModule,
    OrganisationsModule,
    FeatureFlagsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
