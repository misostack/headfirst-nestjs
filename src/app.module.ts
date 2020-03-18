import { Module } from '@nestjs/common';
import { BaseModule } from './base/base.module';
import { BaseController } from './base/controllers/base/base.controller';


@Module({
  imports: [
    BaseModule,
  ],
  controllers: [
    BaseController,
  ],
  providers: [
    
  ],
})
export class AppModule {}
