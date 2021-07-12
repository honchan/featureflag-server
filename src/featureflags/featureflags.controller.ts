import { Controller, Post, Body, Put, Param, HttpCode } from "@nestjs/common";
import { FeatureRulesService } from "src/featurerules/featurerules.service";
import { CreateFeatureFlagDto } from "./dto/createFeatureFlag.dto";
import { FeatureFlagsService } from "./featureflags.service";
import { UpdateDefaultFeatureRuleDto } from '../featurerules/dto/updateDefaultFeatureRuleDto'

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

  @Put(':id/default')
  @HttpCode(200)
  async updateDefaultFeatureRule(
    @Param('id') id: string,
    @Body() updateDefaultFeatureRuleDto: UpdateDefaultFeatureRuleDto,
  ) {
    await this.featureRulesService.updateDefaultFeatureRule(
      updateDefaultFeatureRuleDto,
      parseInt(id),
    );

    return;
  }
}