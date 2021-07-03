import { Controller, Post, Body } from "@nestjs/common";
import { CreateFeatureFlagDto } from "./dto/createFeatureFlag.dto";
import { FeatureFlagsService } from "./featureflags.service";

@Controller('featureflags')
export class FeatureFlagsController {
  constructor(private readonly featureFlagsService: FeatureFlagsService) {}

  @Post()
  createFeatureFlag(@Body() featureFlag: CreateFeatureFlagDto) {
    return this.featureFlagsService.createFeatureFlag(featureFlag);
  }
}