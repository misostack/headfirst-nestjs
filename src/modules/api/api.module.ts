import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { BaseModule } from '@base/base.module';

import { 
  HomeController,
  ExamplesController,
} from './controllers/public';

import { 
  UsersController,
  AuthController, 
} from './controllers/private';

import { 
  AuthService, AdminUserService,
} from './services';
import { AuthMiddleware } from './middlewares';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from './entities';

const PUBLIC_CONTROLLERS = [
  HomeController,
  ExamplesController,
];
const PRIVATE_CONTROLLERS = [
  UsersController,
  AuthController,
]
const PROVIDERS = [
  // services
  AuthService,
  AdminUserService,
];

const ENTITIES = [
  AdminUser,
]


@Module({
  imports: [
    // to allow this module can used the infrastructure service
    BaseModule,
    TypeOrmModule.forFeature(ENTITIES),
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
