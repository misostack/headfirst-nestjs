import { Module } from '@nestjs/common';
import { BaseModule } from '@base/base.module';

// Controllers
import { 
  UsersController,
} from './controllers/users.controller';

// Services
import { 
  AuthService,
} from './services';

@Module({
  imports: [
    // to allow this module can used the infrastructure service
    BaseModule,
  ],
  controllers: [
    UsersController,
  ],
  providers: [
    AuthService,
  ]
})
export class UserModule {}
