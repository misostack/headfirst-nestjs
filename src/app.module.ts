import { Module } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';
import { BaseModule } from './base/base.module';
import { UserModule } from './user/user.module';

const routes: Routes = [
  {
    path: '/v1',
    module: BaseModule,
    children: [
      {
        path: '/users',
        module: UserModule
      }
    ]
  }
]

@Module({
  imports: [
    // setup routes
    RouterModule.forRoutes(routes),
    // add module
    BaseModule,
    UserModule,
  ],
  controllers: [
    
  ],
  providers: [
    
  ],
})
export class AppModule {}
