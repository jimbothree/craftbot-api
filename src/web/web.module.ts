import { Module } from '@nestjs/common';
import { ConfigurationResolver } from './resolvers/configuration/configuration.resolver';
import { ConnectionResolver } from './resolvers/connection/connection.resolver';
import { EngineModule } from '../engine/engine.module';

@Module({
  imports: [
    EngineModule
  ],
  providers: [
    ConfigurationResolver,
    ConnectionResolver
  ]
})
export class WebModule {}
