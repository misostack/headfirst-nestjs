import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ValidationPipe } from '@base/pipes/validation.pipe';

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

  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(3000);
}
bootstrap();
