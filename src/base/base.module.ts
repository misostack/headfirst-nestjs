import { Module } from '@nestjs/common';
import { BaseController } from './controllers/base/base.controller';
import { ValidationPipe } from './pipes/validation.pipe';

@Module({
  controllers: [
    BaseController,
  ],
  providers: [
    ValidationPipe
  ]
})
export class BaseModule {}
