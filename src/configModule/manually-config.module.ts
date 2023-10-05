import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigurableModuleClass } from './config.module-definitions';

@Module({})
export class ManuallyConfigModule extends ConfigurableModuleClass {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: ManuallyConfigModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
