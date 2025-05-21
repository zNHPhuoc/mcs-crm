import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { useContainer } from 'class-validator';
import { NestExpressApplication } from '@nestjs/platform-express';
import { corsConfig } from './config/cors.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './common/filters/exception.filter';
import { swaggerConfig } from './config/swagger.config';
dotenv.config();

const { APP_PORT, APP_HOST } = process.env;

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  corsConfig(app);

  swaggerConfig(app);

  app
    .useStaticAssets(join(__dirname, '../../public/'), {
      prefix: '/public/',
    })
    .useGlobalPipes(new ValidationPipe({ transform: true }))
    .useGlobalFilters(new AllExceptionFilter());

  await app.listen(APP_PORT, async () => {
    Logger.log(`Server running at: ${APP_HOST}:${APP_PORT}`, 'NestApplication');
  });
}

bootstrap();
