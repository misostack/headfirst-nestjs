import { Module } from '@nestjs/common';
import { BaseController } from './controllers/base/base.controller';
import { ValidationPipe } from './pipes/validation.pipe';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [
    BaseController,
  ],
  providers: [
    ValidationPipe
  ],
  exports: [
    ConfigModule
  ]
})
export class BaseModule {}
