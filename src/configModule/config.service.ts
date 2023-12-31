import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { Injectable, Inject } from '@nestjs/common';
import { EnvConfig } from './interfaces';
import { MODULE_OPTIONS_TOKEN } from './config.module-definitions';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: Record<string, any>,
  ) {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;

    const envFile = path.resolve(__dirname, '../../', options.folder, filePath);

    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
