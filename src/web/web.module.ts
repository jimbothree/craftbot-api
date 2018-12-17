import { Module } from '@nestjs/common';
import { ConfigurationResolver } from './resolvers/configuration/configuration.resolver';

@Module({
  providers: [
    ConfigurationResolver
  ]
})
export class WebModule {}
