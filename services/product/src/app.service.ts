import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import Redis from 'ioredis';

@Injectable()
export class AppService {
  private redisPublisher: Redis;

  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {
    this.redisPublisher = new Redis({
      host: process.env.REDIS_HOST || 'redis',
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
      password: process.env.REDIS_PASSWORD || 'your_strong_password', // ← đảm bảo có giá trị
    });

    this.redisPublisher.on('error', (err) => {
      console.error('[Redis Publisher] Error:', err);
    });
  }

  async sendRedisMessage() {
    const message = {
      id: 123,
      name: 'New Product',
      price: 1000,
    };

    await this.redisPublisher.publish(
      'product-created',
      JSON.stringify(message),
    );

    console.log('Message sent to Redis channel "product-created"');
  }

  getHello(): string {
    return 'Hello World!';
  }

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('test-topic');
    await this.kafkaClient.connect();
  }

  sendMessage() {
    const payload = { id: 1, content: 'Hello from Kafka' };

    this.kafkaClient.emit('test-topic', {
      key: 'message1',
      value: JSON.stringify(payload),
    });
  }
}
