import { Provider } from '@nestjs/common';
import { AppLoggerService } from '../../modules/logger/logger.service';
import { RefreshTokenService } from '../../modules/refresh-token/refresh-token.service';

export const sharedProvider: Provider[] = [
  AppLoggerService,
  RefreshTokenService,
];
