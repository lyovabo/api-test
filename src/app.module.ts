import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule } from '@nestjs/config';
import { ManuallyConfigModule } from './configModule/manually-config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { BatsModule } from './bats/bats.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { RegistrationModule } from './registration/registration.module';
import { UsersModule } from './users/users.module';
import {
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_USER,
  TYPEORM_PASSWORD,
  TYPEORM_DB,
} from './utils/constants';

@Module({
  imports: [
    // ConfigModule.forRoot(),
    ManuallyConfigModule.register({ folder: './config' }),
    //or
    // ManuallyConfigModule.config1({ folder: './config' }),
    // or alternatively:
    // ConfigModule.registerAsync({
    //   useFactory: () => {
    //     return {
    //       folder: './config',
    //     }
    //   },
    //   inject: [...any extra dependencies...]
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: TYPEORM_HOST,
      port: parseInt(TYPEORM_PORT as string),
      username: TYPEORM_USER,
      password: TYPEORM_PASSWORD,
      database: TYPEORM_DB,
      entities: [join(__dirname, '**/**', 'entities', '*.entity.{ts,js}')],
      subscribers: [join(__dirname, '**/**', '*.subscriber.{ts,js}')],
      migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
      migrationsRun: true,
      logging: process.env.NODE_ENV === 'development' ? true : false,
    }),
    CatsModule,
    BatsModule,
    AuthenticationModule,
    UsersModule,
    RegistrationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
