import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FeatureFlag } from "src/featureflags/featureflag.entity";
import { Repository } from "typeorm";
import { DefaultFeatureRule } from "./rules/default-rule.entity";
import { WhitelistFeatureRule } from "./rules/whitelist-rule.entity";
import {
  FeatureRuleTypes,
  FeatureRulePriorities,
  FeatureRulesIds,
} from './featurerules.constants';
import { OnetimeFeatureRule } from "./rules/onetime-rule.entity";
import { UpdateDefaultFeatureRuleDto } from "./dto/updateDefaultFeatureRuleDto";

@Injectable()
export class FeatureRulesService {
  constructor(
    @InjectRepository(WhitelistFeatureRule)
    private readonly whitelistFeatureRuleRepository: Repository<WhitelistFeatureRule>,
    @InjectRepository(DefaultFeatureRule)
    private readonly defaultFeatureRuleRespository: Repository<DefaultFeatureRule>,
    @InjectRepository(OnetimeFeatureRule)
    private readonly onetimeFeatureRuleRepository: Repository<OnetimeFeatureRule>,
    @InjectRepository(FeatureFlag)
    private readonly featureFlagRepository: Repository<FeatureFlag>,
  ) {}

  async createOnetimeRule() {
    const newRule = await this.onetimeFeatureRuleRepository.create({
      type: FeatureRuleTypes.ONETIME,
      priority: FeatureRulePriorities.ONETIME,
      enabled: false,
      blocked: [],
    });

    await this.onetimeFeatureRuleRepository.save(newRule);
    return newRule.id;
  }

  async createDefaultRule() {
    const newRule = await this.defaultFeatureRuleRespository.create({
      type: FeatureRuleTypes.DEFAULT,
      priority: FeatureRulePriorities.DEFAULT,
      enabled: false,
    });

    await this.defaultFeatureRuleRespository.save(newRule);
    return newRule.id;
  }

  async createWhitelistRule() {
    const newRule = await this.whitelistFeatureRuleRepository.create({
      type: FeatureRuleTypes.WHITELIST,
      priority: FeatureRulePriorities.WHITELIST,
      enabled: false,
      onList: [],
      offList: [],
    });

    await this.whitelistFeatureRuleRepository.save(newRule);
    return newRule.id;
  }

  async createFeatureRules() : Promise<FeatureRulesIds> {
    const defaultFeatureRuleId = await this.createDefaultRule();
    const whitelistFeatureRuleId = await this.createWhitelistRule();
    const onetimeFeatureRuleId = await this.createOnetimeRule();

    return {
      defaultFeatureRuleId,
      whitelistFeatureRuleId,
      onetimeFeatureRuleId,
    }
  }

  async updateDefaultFeatureRule(
    updateDefaultFeatureRuleDto: UpdateDefaultFeatureRuleDto,
    featureFlagId: number,
  ) {
    const featureFlag = await this.featureFlagRepository.findOne(featureFlagId);
    await this.defaultFeatureRuleRespository.update(
      { id: featureFlag.defaultFeatureRuleId },
      updateDefaultFeatureRuleDto,
    );
  }
}
