import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { OrganisationsModule } from './organisations/organisations.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    DatabaseModule,
    OrganisationsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
