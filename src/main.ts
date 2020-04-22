import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@api/pipes';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const options = new DocumentBuilder()
    .setTitle('Lol Ranking System API')
    .setDescription('The ranking system APIs for all leagues in the world')
    .setVersion('20200319')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);  
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
