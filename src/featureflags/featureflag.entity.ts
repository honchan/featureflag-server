import { Expose } from 'class-transformer';

import { DefaultFeatureRule } from 'src/featurerules/rules/default-rule.entity';
import { OnetimeFeatureRule } from 'src/featurerules/rules/onetime-rule.entity';
import { WhitelistFeatureRule } from 'src/featurerules/rules/whitelist-rule.entity';
import { Organisation } from 'src/organisations/organisation.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class FeatureFlag {
  @PrimaryGeneratedColumn()
  @Expose()
  public id: number;

  @Column()
  @Expose()
  public name: string;

  @Column()
  @Expose()
  public description: string;

  // @ManyToOne(
  //   () => Organisation,
  //   (organisation: Organisation) => organisation.featureFlags,
  // )
  // public organisation: number;

  @Column({ name: 'default_feature_rule_id' })
  defaultFeatureRuleId: number;

  @Column({ name: 'whitelist_feature_rule_id' })
  whitelistFeatureRuleId: number;

  @Column({ name: 'onetime_feature_rule_id' })
  onetimeFeatureRuleId: number;

  @OneToOne(() => DefaultFeatureRule)
  @JoinColumn({ name: 'default_feature_rule_id' })
  public defaultFeatureRule: DefaultFeatureRule;

  @OneToOne(() => WhitelistFeatureRule)
  @JoinColumn({ name: 'whitelist_feature_rule_id' })
  public whitelistFeatureRule: WhitelistFeatureRule;

  @OneToOne(() => OnetimeFeatureRule)
  @JoinColumn({ name: 'onetime_feature_rule_id' })
  public onetimeFeatureRule: OnetimeFeatureRule;
}
