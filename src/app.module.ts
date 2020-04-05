import { Module } from '@nestjs/common';
import configuration from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule, Routes } from 'nest-router';
import { BaseModule } from '@base/base.module';
import { UserModule } from '@user/user.module';

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

const ENTITIES = [

];

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: false,
      load: [configuration]
    }),
    // DB Connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],      
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        // try autoload entities
        autoLoadEntities: true,
        // {module}/entities/entity.entity.ts
        entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
        // entities: ENTITIES,
        // use cli and run schema:sync is better for secured data
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
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
