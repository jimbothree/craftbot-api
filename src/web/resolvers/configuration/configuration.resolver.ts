import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ConfigProvider } from '../../../config/config.service';
import { Config } from '../../../config/config.model';

@Resolver('Configuration')
export class ConfigurationResolver {

  constructor(
    private readonly config: ConfigProvider
  ) { }

  @Query('configuration')
  getConfiguration(): Config {
    return this.config.getCurrentConfig();
  }

  @Mutation()
  setConfiguration(@Args('config') config: Config): Promise<Config> {
    return this.config.saveConfig(config);
  }
}
