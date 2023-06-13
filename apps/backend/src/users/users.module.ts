import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../auth/guard/role.guard';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './users.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...userProviders,
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  exports: [UsersService],
})
export class UsersModule {}
