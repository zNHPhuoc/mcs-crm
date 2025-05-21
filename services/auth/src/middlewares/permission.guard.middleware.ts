import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../modules/user/user.service';
import { CustomPermissionException } from '../common/pipes/custom-permission.pipe';
import { jwtConstants } from '../config/jwt.config';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const { accessSecret } = jwtConstants;

      const roles: string[] = this.reflector.get<string[]>(
        'roles',
        context.getHandler(),
      );

      const permissions: string[] = this.reflector.get<string[]>(
        'permissions',
        context.getHandler(),
      );

      const request = context.switchToHttp().getRequest();

      const token: string = PermissionGuard.extractTokenFromHeader(request);

      const verify = await this.jwtService.verifyAsync(token, {
        secret: accessSecret,
      });

      const user = await this.userService.findOne(verify.sub);

      const userRoles = user.roles.map((role: any) => role.code);

      // includes SA or ADMIN in userRoles
      if (userRoles.includes('sa')) {
        return true;
      }

      const userPermissions = user.roles.reduce((acc: string[], role: any) => {
        const permissions = role.permissions.map(
          (permission: any) => permission.code,
        );
        return acc.concat(permissions);
      }, []);

      const uniquePermissions = Array.from(
        new Set(userPermissions),
      ) as string[];

      if (!verify || !userRoles) {
        throw new CustomPermissionException();
      }

      if (roles?.length) {
        const hasRole = roles.every((role) => userRoles.includes(role));

        if (!hasRole) {
          throw new CustomPermissionException();
        }
      }

      // Check permissions user
      if (permissions?.length) {
        const hasPermission = permissions.every((permission) =>
          uniquePermissions.includes(permission),
        );

        if (!hasPermission) {
          throw new CustomPermissionException();
        }
      }

      return true;
    } catch (e) {
      throw new CustomPermissionException();
    }
  }

  private static extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
