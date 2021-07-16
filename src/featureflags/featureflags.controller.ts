import { Controller, Post, Body, Put, Param, HttpCode, Query, Get, SerializeOptions, HttpException, HttpStatus } from "@nestjs/common";
import { FeatureRulesService } from "src/featurerules/featurerules.service";
import { CreateFeatureFlagDto } from "./dto/createFeatureFlag.dto";
import { FeatureFlagsService } from "./featureflags.service";
import { UpdateDefaultFeatureRuleDto } from '../featurerules/dto/updateDefaultFeatureRuleDto'
import { FeatureRulesIds } from "src/featurerules/featurerules.constants";
import { UpdateWhitelistFeatureRuleDto } from "src/featurerules/dto/updateWhitelistFeatureRuleDto";
import { UpdateOnetimeFeatureRuleDto } from "src/featurerules/dto/updateOnetimeFeatureRuleDto";

@Controller('featureflags')
@SerializeOptions({
  strategy: 'excludeAll',
})
export class FeatureFlagsController {
  constructor(
    private readonly featureFlagsService: FeatureFlagsService,
    private readonly featureRulesService: FeatureRulesService,
  ) {}


  @Get(':id/featurerules')
  async getFeatureRules(@Param('id') id: string) {
    return this.featureRulesService.getFeatureRules(parseInt(id));
  }

  @Get(':id')
  async getFeatureFlagAccessForUser(
    @Param('id') id: string,
    @Query('user') user: string,
  ) {
    if (!id) throw new HttpException('Missing feature flag id', HttpStatus.AMBIGUOUS);
    if (!user) throw new HttpException('Missing user / entity in query', HttpStatus.AMBIGUOUS);

    return this.featureRulesService.getFeatureFlagAccessForUser(
      parseInt(id),
      user,
    );
  }

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
  }

  @Put(':id/whitelist')
  @HttpCode(200)
  async updateWhitelistFeatureRule(
    @Param('id') id: string,
    @Body() updateWhitelistFeatureRuleDto: UpdateWhitelistFeatureRuleDto,
  ) {
    await this.featureRulesService.updateWhitelistFeatureRule(
      updateWhitelistFeatureRuleDto,
      parseInt(id),
    );
  }

  @Put(':id/onetime')
  @HttpCode(200)
  async updateOnetimeFeatureRule(
    @Param('id') id: string,
    @Body() updateOnetimeFeatureRuleDto: UpdateOnetimeFeatureRuleDto,
    @Query('reset') reset: string,
  ) {
    const shouldReset = reset === 'true';
    console.log('on etime controller')
    await this.featureRulesService.updateOnetimeFeatureRule(
      updateOnetimeFeatureRuleDto,
      parseInt(id),
      shouldReset,
    );
  }
}
