import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './const/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api')
  app.enableCors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  })
  await app.listen(PORT);
}
bootstrap();
