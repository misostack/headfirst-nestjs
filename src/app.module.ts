import { Module } from '@nestjs/common';
import configuration from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule, Routes } from 'nest-router';
import { BaseModule } from '@base/base.module';
import { ApiModule } from './modules/api/api.module';
import { WebModule } from './modules/web/web.module';

const routes: Routes = [
  {
    path: '',
    module: ApiModule,
  },
  {
    path: '/web',
    module: WebModule,
  },  
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
        url: configService.get<string>('DATABASE_URL'),     
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
    ApiModule,
    WebModule,
  ],
  controllers: [
    
  ],
  providers: [
    
  ],
})
export class AppModule {}
