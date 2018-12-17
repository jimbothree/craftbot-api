// TODO: this is bad but the certificates don't play nice with node
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Adds websocket support
// tslint:disable-next-line:no-var-requires
(global as any).WebSocket = require('ws');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
