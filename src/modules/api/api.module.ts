import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { BaseModule } from '@base/base.module';

import { 
  HomeController,
} from './controllers/public';

import { 
  UsersController,
  AuthController, 
} from './controllers/private';

import { 
  AuthService,
} from './services';
import { AuthMiddleware } from './middlewares';

const PUBLIC_CONTROLLERS = [
  HomeController,
];
const PRIVATE_CONTROLLERS = [
  UsersController,
  AuthController,
]
const PROVIDERS = [
  AuthService,
];

@Module({
  imports: [
    // to allow this module can used the infrastructure service
    BaseModule,
  ],
  controllers: [
    ...PUBLIC_CONTROLLERS,
    ...PRIVATE_CONTROLLERS,
  ],
  providers: [
    ...PROVIDERS, 
  ]
})
export class ApiModule implements NestModule{
  public configure(consumer: MiddlewareConsumer ) {
    consumer
    .apply(AuthMiddleware)
    .exclude(
      'private/auth/(.*)'      
    )
    .forRoutes(
      {path: 'private', method: RequestMethod.ALL}
    )
  }
}
