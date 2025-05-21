import { Inject, Injectable } from '@nestjs/common';
import { RefreshTokenInterfaceRepository } from '../../repositories/refresh-token/refresh-token.interface.repository';
import { Request } from 'express';

@Injectable()
export class RefreshTokenService {
  constructor(
    @Inject('RefreshTokenInterfaceRepository')
    private readonly refreshTokenRepository: RefreshTokenInterfaceRepository,
  ) {}

  async isRevoked(signPayload: JwtPayload, req: Request): Promise<boolean> {
    const ip = req.ip;
    const userAgent = req.headers['user-agent'];

    const refreshToken = await this.refreshTokenRepository.findOneByCondition({
      userId: signPayload.sub,
      revoked: false,
      ip,
      userAgent,
    });

    return !refreshToken;
  }
}
