import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { EngineModule } from './engine/engine.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      // definitions: {
      //   path: join(process.cwd(), 'src/graphql.schema.ts'),
      //   outputAs: 'class'
      // }
    }),
    EngineModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
