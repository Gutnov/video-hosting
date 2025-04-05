import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import './mapping';
// import { SequelizeModule } from '@nestjs/sequelize';
// import { User } from './models/user.model';
import { DatabaseModule } from '../database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [DatabaseModule, SequelizeModule.forFeature([User])],
  exports: [UsersService],
})
export class UsersModule {}
