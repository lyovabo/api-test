import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
// import cors from 'cors';
import { LoggerMiddleware } from '../middlewares/logger.middleware';
import { BatsController } from './bats.controller';
import { BatsService } from './bats.service';

@Module({
  controllers: [BatsController],
  providers: [BatsService],
  exports: [BatsService],
})
export class BatsModule implements NestModule {
  // example how to apply middleware/middlewares
  // and exclude that middleware
  // to be applied for some path case
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'cats', method: RequestMethod.POST }, 'cats/(.*)')
      .forRoutes('bats');
  }
}
