import { Module } from '@nestjs/common';
import { BaseModule } from '../base/base.module';
import { PingController } from './controllers';

@Module({
  imports: [
    // to allow this module can used the infrastructure service
    BaseModule,
  ],
  controllers: [
    PingController,
  ],
  providers: [
    
  ]  
})
export class ApiModule {}
