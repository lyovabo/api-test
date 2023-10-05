import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
// import cors from 'cors';
import { RatsController } from './rats.controller';
import { RatsService } from './rats.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  controllers: [RatsController],
  providers: [RatsService],
  exports: [RatsService],
})
export class RatsModule implements NestModule {
  // example how to apply middleware/middlewares
  // and exclude that middleware
  // to be applied for some path case
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'rats', method: RequestMethod.POST }, 'rats/(.*)')
      .forRoutes('rats');
  }
}
