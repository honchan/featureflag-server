import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureFlag } from 'src/featureflags/featureflag.entity';
import { DefaultFeatureRule } from './rules/default-rule.entity';
import { FeatureRulesService } from './featurerules.service';
import { WhitelistFeatureRule } from './rules/whitelist-rule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WhitelistFeatureRule,
      DefaultFeatureRule,
      FeatureFlag,
    ]),
  ],
  controllers: [],
  providers: [FeatureRulesService],
  exports: [FeatureRulesService],
})
export class FeatureRulesModule {}

