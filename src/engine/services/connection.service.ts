import { Injectable } from '@nestjs/common';
import { EngineService } from './engine.service';
import { ConfigProvider } from '../../config/config.service';

// this service is just to expose some methods & observables from the engine

@Injectable()
export class ConnectionService {
  public connected$ = this.engine.connected$;
  public currentChannel$ = this.engine.currentChannel$;

  constructor(
    private readonly engine: EngineService,
    private readonly config: ConfigProvider
  ) { }

  public connect() {
    this.engine.connect(this.config.apiKey);
  }

  public disconnect() {
    this.engine.disconnect();
  }
}
