import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { BaseModule } from '@base/base.module';

@Module({
  imports: [
    // to allow this module can used the infrastructure service
    BaseModule
  ],
  controllers: [
    UsersController,
  ]
})
export class UserModule {}
