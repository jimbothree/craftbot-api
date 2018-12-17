import { Injectable } from '@nestjs/common';
import { EngineService } from './engine.service';

@Injectable()
export class MessageService {

  constructor(
    private readonly engine: EngineService
  ) { }

}
