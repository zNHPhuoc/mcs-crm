import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Kafka broker
  const kafkaBroker = process.env.KAFKA_BROKER || 'kafka:9092';

  // Kafka microservice
  const kafkaApp = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [kafkaBroker],
      },
      consumer: {
        groupId: 'product-consumer', // cần có groupId
      },
    },
  });

  // Redis microservice
  const redisHost = process.env.REDIS_HOST || 'redis';
  const redisPort = parseInt(process.env.REDIS_PORT || '6379', 10);
  const redisPassword = process.env.REDIS_PASSWORD || 'your_strong_password';

  const redisApp = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: redisHost,
      port: redisPort,
      password: redisPassword,
      retryAttempts: 5,
      retryDelay: 3000,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);

  console.log('App started on port 3000');
}
bootstrap();
