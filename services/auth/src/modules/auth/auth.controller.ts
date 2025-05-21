import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { AppLoggerService } from '../logger/logger.service';
import { fullPath } from '../../utils/route';
import { AuthGuard } from '../../middlewares/auth.guard.middleware';
import { AuthRequest } from './auth.interface';
import { AuthRegisterDto } from './dto/auth-register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: AppLoggerService,
  ) {
    this.logger.setContext('AuthController');
  }

  @ApiOperation({ summary: 'Login' })
  @Post('login')
  async login(
    @Body() authLoginDto: AuthLoginDto,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<void> {
    try {
      const response = await this.authService.login(authLoginDto, req);
      this.logger.log(JSON.stringify(response), fullPath(req));
      return res.locals.standardResponse(response);
    } catch (e) {
      this.logger.error(fullPath(req), e);
      return res.locals.standardResponse(null, e);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Logout' })
  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    try {
      await this.authService.logout(req as AuthRequest);
      return res.locals.standardResponse({});
    } catch (e) {
      return res.locals.standardResponse(null, e);
    }
  }

  @ApiOperation({ summary: 'Register' })
  @Post('/register')
  async register(
    @Body() authRegisterDto: AuthRegisterDto,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<void> {
    try {
      const response = await this.authService.register(authRegisterDto, req);
      this.logger.log(JSON.stringify(response), fullPath(req));
      return res.locals.standardResponse(response);
    } catch (e) {
      console.log(e);
      this.logger.error(fullPath(req), e);
      return res.locals.standardResponse(null, e);
    }
  }
}
