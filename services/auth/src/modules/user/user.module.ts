import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { repositoryProvider } from '../../common/providers/repository.provider';
import { JwtService } from '@nestjs/jwt';
import { sharedProvider } from '../../common/providers/shared.provider';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    JwtService,
    ...repositoryProvider,
    ...sharedProvider,
  ],
  exports: [UserService],
})
export class UserModule {}
