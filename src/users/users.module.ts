import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

// Here we are making user entity visible inside services through module
// This module uses the forFeature() method to define which repositories are registered
// in the current scope. With that in place,
// we can inject the UsersRepository into the UsersService using the @InjectRepository() decorator:
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
