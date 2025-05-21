import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Hashing } from '../../utils/hashing';
import { JwtService } from '@nestjs/jwt';
import { repositoryProvider } from '../../common/providers/repository.provider';
import { sharedProvider } from '../../common/providers/shared.provider';
import { UserService } from '../user/user.service';
import { validatedAuthProvider } from '../../common/providers/validated.provider';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    Hashing,
    JwtService,
    UserService,
    ...repositoryProvider,
    ...sharedProvider,
    ...validatedAuthProvider,
  ],
  exports: [AuthService],
})
export class AuthModule {}
