import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { EngineModule } from './engine/engine.module';
import { ConfigModule } from './config/config.module';
import { join } from 'path';
import { WebModule } from './web/web.module';

@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      // definitions: {
      //   path: join(process.cwd(), 'src/graphql.schema.ts'),
      //   outputAs: 'class'
      // }
    }),
    EngineModule,
    WebModule
  ]
})
export class AppModule {}
