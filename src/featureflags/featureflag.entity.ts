import { DefaultFeatureRule } from 'src/featurerules/rules/default-rule.entity';
import { OnetimeFeatureRule } from 'src/featurerules/rules/onetime-rule.entity';
import { WhitelistFeatureRule } from 'src/featurerules/rules/whitelist-rule.entity';
import { Organisation } from 'src/organisations/organisation.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class FeatureFlag {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @ManyToOne(
    () => Organisation,
    (organisation: Organisation) => organisation.featureFlags,
  )
  public organisation: number;

  @OneToOne(() => DefaultFeatureRule, { eager: true })
  @JoinColumn()
  public defaultFeatureRule: DefaultFeatureRule;

  @OneToOne(() => WhitelistFeatureRule, { eager: true })
  @JoinColumn()
  public whitelistFeatureRule: WhitelistFeatureRule;

  @OneToOne(() => OnetimeFeatureRule, { eager: true })
  @JoinColumn()
  public onetimeFeatureRule: OnetimeFeatureRule;
}
