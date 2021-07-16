import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FeatureFlag } from "src/featureflags/featureflag.entity";
import { Repository, TreeChildren } from "typeorm";
import { DefaultFeatureRule } from "./rules/default-rule.entity";
import { WhitelistFeatureRule } from "./rules/whitelist-rule.entity";
import {
  FeatureRuleTypes,
  FeatureRulePriorities,
  FeatureRulesIds,
} from './featurerules.constants';
import { OnetimeFeatureRule } from "./rules/onetime-rule.entity";
import { UpdateDefaultFeatureRuleDto } from "./dto/updateDefaultFeatureRuleDto";
import { UpdateWhitelistFeatureRuleDto } from "./dto/updateWhitelistFeatureRuleDto";
import { UpdateOnetimeFeatureRuleDto } from "./dto/updateOnetimeFeatureRuleDto";

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
    const { defaultFeatureRuleId } = await this.featureFlagRepository.findOne(featureFlagId);
    await this.defaultFeatureRuleRespository.update(
      { id: defaultFeatureRuleId },
      updateDefaultFeatureRuleDto,
    );
  }

  async updateWhitelistFeatureRule(
    updateWhitelistFeatureRuleDto: UpdateWhitelistFeatureRuleDto,
    featureFlagId: number,
  ) {
    const { whitelistFeatureRuleId } = await this.featureFlagRepository.findOne(featureFlagId);

    const uniqueOnList = updateWhitelistFeatureRuleDto
      ? [...new Set(updateWhitelistFeatureRuleDto.onList)]
      : [];
    const uniqueOffList = updateWhitelistFeatureRuleDto
      ? [...new Set(updateWhitelistFeatureRuleDto.offList)]
      : [];

    await this.whitelistFeatureRuleRepository.update(
      { id: whitelistFeatureRuleId },
      {
        enabled: updateWhitelistFeatureRuleDto.enabled,
        onList: uniqueOnList,
        offList: uniqueOffList,
      },
    );
  }

  async updateOnetimeFeatureRule(
    updateOnetimeFeatureRuleDto: UpdateOnetimeFeatureRuleDto,
    featureFlagId: number,
    reset: boolean,
  ) {
    const { onetimeFeatureRuleId } = await this.featureFlagRepository.findOne(featureFlagId);

    const payload = {
      ...updateOnetimeFeatureRuleDto,
      ...(reset && { blocked: [] }),
    };

    await this.onetimeFeatureRuleRepository.update(
      { id: onetimeFeatureRuleId },
      payload,
    );
  }

  async getFeatureRules(featureFlagid: number) {
    const {
      defaultFeatureRuleId,
      whitelistFeatureRuleId,
      onetimeFeatureRuleId,
    } = await this.featureFlagRepository.findOne(featureFlagid);

    const defaultFeatureRule = await this.defaultFeatureRuleRespository.findOne(defaultFeatureRuleId)
    const whitelistFeatureRule = await this.whitelistFeatureRuleRepository.findOne(whitelistFeatureRuleId)
    const onetimeFeatureRule = await this.onetimeFeatureRuleRepository.findOne(onetimeFeatureRuleId)

    return [defaultFeatureRule, whitelistFeatureRule, onetimeFeatureRule];
  }

  async getFeatureFlagAccessForUser(featureFlagId: number, user: string) {
    const {
      defaultFeatureRuleId,
      whitelistFeatureRuleId,
      onetimeFeatureRuleId,
    } = await this.featureFlagRepository.findOne(featureFlagId);

    const onetimeFeatureRule = await this.onetimeFeatureRuleRepository.findOne(onetimeFeatureRuleId)

    if (onetimeFeatureRule.enabled) {
      const blocked = onetimeFeatureRule.blocked.includes(user);
      if (blocked) return false;

      const payload = [...onetimeFeatureRule.blocked, user];
      await this.onetimeFeatureRuleRepository.update(
        { id: onetimeFeatureRuleId },
        { blocked: payload },
      );

      return true;
    }

    const whitelistFeatureRule = await this.whitelistFeatureRuleRepository.findOne(whitelistFeatureRuleId)
    if (whitelistFeatureRule.enabled) {
      if (whitelistFeatureRule.onList.includes(user)) return true;
      if (whitelistFeatureRule.offList.includes(user)) return false;
    }

    const defaultFeatureRule = await this.defaultFeatureRuleRespository.findOne(defaultFeatureRuleId)
    if (defaultFeatureRule.enabled) return true;

    return false;
  }
}
