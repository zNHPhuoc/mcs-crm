import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { config } from 'dotenv';
import { mapErrorCodesToSwaggerSchema } from '../utils';
config();
const { SWAGGER_ENABLE, APP_PREFIX, APP_VERSION, APP_NAME } = process.env;

export const swaggerConfig = (app: INestApplication): void => {
  if (!SWAGGER_ENABLE || SWAGGER_ENABLE === 'false') return;

  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle(`${APP_NAME}`)
    .setDescription('The API Microservice Auth')
    .setVersion(APP_VERSION)
    .addBearerAuth()
    .build();

  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };

  const document: OpenAPIObject = SwaggerModule.createDocument(
    app,
    config,
    options,
  );

  document.components.schemas = {
    ...document.components.schemas,
    ErrorCode: mapErrorCodesToSwaggerSchema(),
  };

  SwaggerModule.setup(APP_PREFIX, app, document);
};
