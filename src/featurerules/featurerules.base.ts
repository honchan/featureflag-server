import { Column } from "typeorm";

export class FeatureRuleBase {
  @Column()
  type: string;

  @Column()
  priority: number;

  @Column()
  enabled: boolean;
}

