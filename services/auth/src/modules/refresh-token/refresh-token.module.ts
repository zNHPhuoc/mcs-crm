import { Module } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { repositoryProvider } from '../../common/providers/repository.provider';

@Module({
  providers: [RefreshTokenService, ...repositoryProvider],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
