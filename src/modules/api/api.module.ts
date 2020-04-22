import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { BaseModule } from '@base/base.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { 
  AdminUsersController,
  AdminAuthController, 
} from './controllers/admin';

import { 
  AuthService, AdminUserService,
} from './services';
import { AuthMiddleware } from './middlewares';

import { 
  AdminUser,
} from './entities';

import {
  isUniqueValidator,
} from './validators';


const ADMIN_CONTROLLERS = [
  AdminUsersController,
  AdminAuthController,
];

const PROVIDERS = [
  // Services
  AuthService,
  AdminUserService,
  // validators
  isUniqueValidator,
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
    ...ADMIN_CONTROLLERS,
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
      'admin/auth/(.*)'      
    )
    .forRoutes(
      {path: 'admin', method: RequestMethod.ALL}
    )
  }
}
