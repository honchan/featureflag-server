import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFeatureFlagDto } from "./dto/createFeatureFlag.dto";
import { FeatureFlag } from "./featureflag.entity";

@Injectable()
export class FeatureFlagsService {
  constructor(
    @InjectRepository(FeatureFlag)
    private readonly featureFlagsRepository: Repository<FeatureFlag>,
  ) {}

  async createFeatureFlag(featureFlag: CreateFeatureFlagDto) {
    const newFeatureFlag = await this.featureFlagsRepository.create(
      featureFlag,
    );
    await this.featureFlagsRepository.save(newFeatureFlag);

    return newFeatureFlag;
  }
}
