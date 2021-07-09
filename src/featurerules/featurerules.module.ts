import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureFlag } from 'src/featureflags/featureflag.entity';
import { FeatureFlagsModule } from 'src/featureflags/featureflags.module';
import { DefaultFeatureRule } from './default-rule.entity';
import { FeatureRulesService } from './featurerules.service';

@Module({
  imports: [TypeOrmModule.forFeature([DefaultFeatureRule, FeatureFlag])],
  controllers: [],
  providers: [FeatureRulesService],
  exports: [FeatureRulesService],
})
export class FeatureRulesModule {}

