import { Injectable } from '@nestjs/common';
import { Config } from './config.model';

import * as fs from 'fs';
import * as joi from 'joi';
import { DEFAULT_CONFIG } from './default-config';

@Injectable()
export class ConfigProvider {
  private config: Config = DEFAULT_CONFIG;

  public get apiKey(): string { return this.config.API_KEY; }
  public set apiKey(val: string) { this.config.API_KEY = val; }

  public get debug(): boolean { return this.config.DEBUG; }
  public set debug(val: boolean) { this.config.DEBUG = val; }

  public get logToFile(): boolean { return this.config.LOG_TO_FILE; }
  public set logToFile(val: boolean) { this.config.LOG_TO_FILE = val; }

  constructor() {
    this.refreshConfig();
  }

  public refreshConfig() {
    this.config = this.validate(this.grabConfigFromJson());
  }

  public saveConfig(config: Config): Promise<Config> {
    return new Promise((resolve, reject) => {
      try {
        this.config = this.validate(config);
        fs.writeFile('config.json', JSON.stringify(this.config), (err) => {
          if (typeof err !== 'undefined' && err !== null) {
            reject(err);
          } else {
            resolve(this.config);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  public getCurrentConfig(): Config {
    return this.config;
  }

  private grabConfigFromJson(): Config {
    let config: Config = DEFAULT_CONFIG;
    try {
      if (fs.existsSync('config.json')) {
        const configJson = fs.readFileSync('config.json', { encoding: 'utf8' });
        config = JSON.parse(configJson);
      }
    } catch (ex) {
      // Invalidate the config if an exception is hit
      config = DEFAULT_CONFIG;
      console.error('Exception loading config -> %o', ex);
    }

    return config;
  }

  private validate(untestedConfig: Config): Config {
    const schema: joi.ObjectSchema = joi.object({
      DEBUG: joi
        .bool()
        .default(false),
      API_KEY: joi
        .string()
        .default(''),
      LOG_TO_FILE: joi
        .bool()
        .default(false)
    });

    const { error, value: validatedConfig } = joi.validate(untestedConfig, schema);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedConfig;
  }
}
