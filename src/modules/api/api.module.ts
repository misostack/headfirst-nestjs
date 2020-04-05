import { Module } from '@nestjs/common';
import { BaseModule } from '../base/base.module';
import { 
  HomeController,
} from './controllers';

const CONTROLLERS = [
  HomeController,
]

@Module({
  imports: [
    // to allow this module can used the infrastructure service
    BaseModule,
  ],
  controllers: [
    ...CONTROLLERS
  ],
  providers: [
    
  ]  
})
export class ApiModule {}
