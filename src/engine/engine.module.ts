import { Module } from '@nestjs/common';
import { BattleNetClassicLibModule } from 'battle-net-classic-lib';

@Module({
  imports: [
    BattleNetClassicLibModule
  ],
  controllers: [],
  providers: []
})
export class EngineModule { }
