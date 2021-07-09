import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FeatureFlag } from "src/featureflags/featureflag.entity";
import { Repository } from "typeorm";
import { DefaultFeatureRule } from "./rules/default-rule.entity";
import { WhitelistFeatureRule } from "./rules/whitelist-rule.entity";
import {
  FeatureRuleTypes,
  FeatureRulePriorities,
} from './featurerules.constants';

@Injectable()
export class FeatureRulesService {
  constructor(
    @InjectRepository(WhitelistFeatureRule)
    private readonly whitelistFeatureRuleRepository: Repository<WhitelistFeatureRule>,
    @InjectRepository(DefaultFeatureRule)
    private readonly defaultFeatureRuleRespository: Repository<DefaultFeatureRule>,
    @InjectRepository(FeatureFlag)
    private readonly featureFlagRepository: Repository<FeatureFlag>,
  ) {}

  async createDefaultRule(featureFlagId: number) {
    const newRule = await this.defaultFeatureRuleRespository.create({
      type: FeatureRuleTypes.DEFAULT,
      priority: FeatureRulePriorities.DEFAULT,
      enabled: false,
    });

    await this.defaultFeatureRuleRespository.save(newRule);
    await this.featureFlagRepository.update(
      { id: featureFlagId },
      { defaultFeatureRule: newRule },
    );
  }

  async createWhitelistRule(featureFlagId: number) {
    const newRule = await this.whitelistFeatureRuleRepository.create({
      type: FeatureRuleTypes.WHITELIST,
      priority: FeatureRulePriorities.WHITELIST,
      enabled: false,
      onList: [],
      offList: [],
    });

    await this.whitelistFeatureRuleRepository.save(newRule);
    await this.featureFlagRepository.update(
      { id: featureFlagId },
      { whitelistFeatureRule: newRule },
    );
  }

  createFeatureRules(featureFlagId: number) {
    this.createDefaultRule(featureFlagId);
    this.createWhitelistRule(featureFlagId);
  }
}