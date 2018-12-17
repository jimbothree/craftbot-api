import { Module } from '@nestjs/common';
import { EngineService } from './services/engine.service';
import { UserService } from './services/user.service';
import { MessageService } from './services/message.service';
import { ConnectionService } from './services/connection.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    EngineService,
    UserService,
    MessageService,
    ConnectionService
  ],
  exports: [
    UserService,
    MessageService,
    ConnectionService
  ]
})
export class EngineModule { }
