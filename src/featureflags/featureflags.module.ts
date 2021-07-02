import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FeatureFlag } from "./featureflag.entity";
import { FeatureFlagsController } from "./featureflags.controller";
import { FeatureFlagsService } from "./featureflags.service";

@Module({
  imports: [TypeOrmModule.forFeature([FeatureFlag])],
  controllers: [FeatureFlagsController],
  providers: [FeatureFlagsService],
})
export class FeatureFlagsModule {}
