import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('send')
  sendKafkaMessage() {
    this.appService.sendMessage();
    return 'Message sent to Kafka!';
  }

  @EventPattern('test-topic')
  async handleTestMessage(@Payload() message: any) {
    console.log('Received from Kafka:', message);

    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log('✅ Done processing after 3s:', message);
  }

  @Get('send-redis')
  async sendToRedis() {
    await this.appService.sendRedisMessage();
    return 'Message sent to Redis!';
  }

  @MessagePattern('product-created')
  handleProductCreated(data: any) {
    console.log('Received product from Redis:', data);
  }
}
