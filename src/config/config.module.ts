import { Module, Global } from '@nestjs/common';
import { ConfigProvider } from './config.service';

@Global()
@Module({
  providers: [ConfigProvider],
  exports: [ConfigProvider],
})
export class ConfigModule {}
