import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FeatureFlag } from "./featureflag.entity";
import { FeatureFlagsController } from "./featureflags.controller";
import { FeatureFlagsService } from "./featureflags.service";
import { FeatureRulesModule } from '../featurerules/featurerules.module'

@Module({
  imports: [TypeOrmModule.forFeature([FeatureFlag]), FeatureRulesModule],
  controllers: [FeatureFlagsController],
  providers: [FeatureFlagsService],
})
export class FeatureFlagsModule {}
