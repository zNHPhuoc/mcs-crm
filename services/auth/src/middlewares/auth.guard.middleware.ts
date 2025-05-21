import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { CustomGuardException } from '../common/pipes/custom-guard-exception.pipe';
import { jwtConstants } from '../config/jwt.config';
import { UserService } from '../modules/user/user.service';
import { UserStatus } from '../common/enums/user.enum';
import { RefreshTokenService } from '../modules/refresh-token/refresh-token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const { accessSecret } = jwtConstants;

    const request = context.switchToHttp().getRequest();

    const token: string = AuthGuard.extractTokenFromHeader(request);

    if (!token) {
      throw new CustomGuardException();
    }

    try {
      const verify = await this.jwtService.verifyAsync(token, {
        secret: accessSecret,
      });

      await this.canAccess(verify.sub);

      // Check revoked
      const isRevoked = await this.refreshTokenService.isRevoked(
        verify,
        request,
      );

      if (isRevoked) {
        throw new CustomGuardException();
      }

      request.user = verify;

      return true;
    } catch (e) {
      throw new CustomGuardException();
    }
  }

  private static extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async canAccess(id: string) {
    const user = await this.userService.findOne(id);

    if (!user || user?.status !== UserStatus.ACTIVE) {
      throw new CustomGuardException();
    }

    return user;
  }
}
