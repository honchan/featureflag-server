import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FeatureFlag } from "src/featureflags/featureflag.entity";
import { Repository } from "typeorm";
import { DefaultFeatureRule } from "./default-rule.entity";

@Injectable()
export class FeatureRulesService {
  constructor(
    @InjectRepository(DefaultFeatureRule)
    private readonly defaultFeatureRuleRespository: Repository<DefaultFeatureRule>,
    @InjectRepository(FeatureFlag)
    private readonly featureFlagRepository: Repository<FeatureFlag>,
  ) {}

  async createDefaultRule(featureFlagId: number) {
    const newRule = await this.defaultFeatureRuleRespository.create({
      type: 'DEFAULT',
      priority: 1,
      enabled: false,
    });

    await this.defaultFeatureRuleRespository.save(newRule);
    await this.featureFlagRepository.update(
      { id: featureFlagId },
      { defaultFeatureRule: newRule },
    );
  }

  createFeatureRules(featureFlagId: number) {
    this.createDefaultRule(featureFlagId);
  }
}