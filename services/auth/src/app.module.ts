import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AppDataSource } from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { StandardResponseMiddleware } from './middlewares/standard-response.middleware';
import { APP_PIPE } from '@nestjs/core';
import { LoggerModule } from './modules/logger/logger.module';
import { RefreshTokenModule } from './modules/refresh-token/refresh-token.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(AppDataSource.options),
    UserModule,
    AuthModule,
    LoggerModule,
    RefreshTokenModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_PIPE, useClass: ValidationPipe }, AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(StandardResponseMiddleware).forRoutes('*');
  }
}
