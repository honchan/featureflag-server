import { Controller, Post, Body, Put, Param, HttpCode } from "@nestjs/common";
import { FeatureRulesService } from "src/featurerules/featurerules.service";
import { CreateFeatureFlagDto } from "./dto/createFeatureFlag.dto";
import { FeatureFlagsService } from "./featureflags.service";
import { UpdateDefaultFeatureRuleDto } from '../featurerules/dto/updateDefaultFeatureRuleDto'
import { FeatureRulesIds } from "src/featurerules/featurerules.constants";

@Controller('featureflags')
export class FeatureFlagsController {
  constructor(
    private readonly featureFlagsService: FeatureFlagsService,
    private readonly featureRulesService: FeatureRulesService,
  ) {}

  @Post()
  async createFeatureFlag(@Body() featureFlag: CreateFeatureFlagDto) {
    const featureRules: FeatureRulesIds = await this.featureRulesService.createFeatureRules();
    const newFlag = await this.featureFlagsService.createFeatureFlag(
      featureFlag,
      featureRules,
    );
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