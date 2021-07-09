import { Controller, Post, Body } from "@nestjs/common";
import { FeatureRulesService } from "src/featurerules/featurerules.service";
import { CreateFeatureFlagDto } from "./dto/createFeatureFlag.dto";
import { FeatureFlagsService } from "./featureflags.service";

@Controller('featureflags')
export class FeatureFlagsController {
  constructor(
    private readonly featureFlagsService: FeatureFlagsService,
    private readonly featureRulesService: FeatureRulesService,
  ) {}

  @Post()
  async createFeatureFlag(@Body() featureFlag: CreateFeatureFlagDto) {
    const newFlag = await this.featureFlagsService.createFeatureFlag(featureFlag);
    await this.featureRulesService.createFeatureRules(newFlag.id);
    return newFlag;
  }
}