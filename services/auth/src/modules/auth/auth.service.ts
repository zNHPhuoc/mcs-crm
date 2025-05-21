import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UserInterfaceRepository } from '../../repositories/user/user.interface.repository';
import { Hashing } from '../../utils/hashing';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../../config/jwt.config';
import { User } from '../../database/entities/user.entity';
import { RefreshTokenInterfaceRepository } from '../../repositories/refresh-token/refresh-token.interface.repository';
import { Request } from 'express';
import { getClientIp, getUserAgent } from '../../utils/fingerprint';
import { AuthRequest } from './auth.interface';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashing: Hashing,
    private readonly jwtService: JwtService,
    @Inject('UserInterfaceRepository')
    private readonly userRepository: UserInterfaceRepository,
    @Inject('RefreshTokenInterfaceRepository')
    private readonly refreshTokenRepository: RefreshTokenInterfaceRepository,
  ) {}

  async login(authLoginDto: AuthLoginDto, req: Request) {
    try {
      const user = await this.validateUser(authLoginDto);

      const userId = user.id;

      const token: SignPayload = await this.getToken({
        sub: userId,
        email: user.email,
        username: user.username,
        phoneNumber: user.phoneNumber,
      });

      const ip = getClientIp(req);
      const userAgent = getUserAgent(req);

      const existingToken =
        await this.refreshTokenRepository.findOneByCondition({
          userId,
          ip,
          userAgent,
          revoked: false,
        });

      const expiresAt = this.getRefreshExpiresAt();

      const { refreshToken } = token;
      if (existingToken) {
        await this.refreshTokenRepository.update(existingToken.id, {
          token: refreshToken,
          expiresAt: expiresAt,
        });
      } else {
        await this.refreshTokenRepository.create({
          userId: userId,
          token: refreshToken,
          expiresAt: expiresAt,
          ip,
          userAgent,
        });
      }

      delete user.password;

      return { token, user: user };
    } catch (e) {
      throw e;
    }
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<User | null> {
    const { identity, password } = authLoginDto;

    const user = await this.userRepository.findOneByIdentity(identity);
    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const isMatch = await this.hashing.comparePassword(password, user.password);
    if (!isMatch) {
      throw new HttpException(
        'PASSWORD_INCORRECT',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return user;
  }

  async getToken(payload: JwtPayload): Promise<SignPayload> {
    const [accessToken, refreshToken] = await Promise.all([
      this.createToken(payload),
      this.createRefresh(payload),
    ]);

    return {
      type: 'Bearer',
      accessToken,
      refreshToken,
    };
  }

  async createToken(payload: JwtPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: jwtConstants.accessSecret,
      expiresIn: jwtConstants.accessExpiresIn,
    });
  }

  async createRefresh(payload: JwtPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: jwtConstants.refreshSecret,
      expiresIn: jwtConstants.refreshExpiresIn,
    });
  }

  private getRefreshExpiresAt(): Date {
    const expiresInMs = this.parseTimeToMs(jwtConstants.refreshExpiresIn);
    return new Date(Date.now() + expiresInMs);
  }

  private parseTimeToMs(time: string): number {
    const unit = time.slice(-1);
    const value = parseInt(time.slice(0, -1));
    const multiplier =
      { s: 1000, m: 60000, h: 3600000, d: 86400000 }[unit] || 1000;
    return value * multiplier;
  }

  async logout(req: AuthRequest) {
    try {
      const sub = req?.user;

      const ip = getClientIp(req);
      const userAgent = getUserAgent(req);
      const userId = sub?.sub;

      return await this.refreshTokenRepository.updateManyByCondition(
        {
          userId,
          ip,
          userAgent,
          revoked: false,
        },
        {
          revoked: true,
        },
      );
    } catch (e) {
      throw e;
    }
  }

  async register(
    authRegisterDto: AuthRegisterDto,
    req: Request,
  ): Promise<User> {
    try {
      const { email, password, username, phoneNumber } = authRegisterDto;

      const hashedPassword = await this.hashing.hashPassword(password);

      const newUser = await this.userRepository.create({
        email,
        password: hashedPassword,
        username,
        phoneNumber,
      });

      return newUser;
    } catch (e) {
      console.log(e, 'Error in register method');
      throw e;
      // throw new HttpException(
      //   'REGISTER_FAILED',
      //   HttpStatus.INTERNAL_SERVER_ERROR,
      // );
    }
  }
}
