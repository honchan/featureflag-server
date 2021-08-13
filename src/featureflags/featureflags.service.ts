import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FeatureRulesIds } from "src/featurerules/featurerules.constants";
import { Repository } from "typeorm";
import { CreateFeatureFlagDto } from "./dto/createFeatureFlag.dto";
import { FeatureFlag } from "./featureflag.entity";

@Injectable()
export class FeatureFlagsService {
  constructor(
    @InjectRepository(FeatureFlag)
    private readonly featureFlagsRepository: Repository<FeatureFlag>,
  ) {}

  async createFeatureFlag(
    featureFlag: CreateFeatureFlagDto,
    featureRules: FeatureRulesIds,
  ) {
    const newFeatureFlag = await this.featureFlagsRepository.create({
      ...featureFlag,
      ...featureRules,
    });
    await this.featureFlagsRepository.save(newFeatureFlag);
    return newFeatureFlag;
  }

  async getFeatureFlags() {
    return this.featureFlagsRepository.find();
  }

  async deleteFeatureFlag(id: number) {
    await this.featureFlagsRepository.delete(id);
  }
}
