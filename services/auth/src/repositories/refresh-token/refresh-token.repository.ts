import { BaseRepositoryAbstract } from '../base-abstract.repository';
import { RefreshToken } from '../../database/entities/refresh-token.entity';
import { RefreshTokenInterfaceRepository } from './refresh-token.interface.repository';
import { DataSource } from 'typeorm';

export class RefreshTokenRepository
  extends BaseRepositoryAbstract<RefreshToken>
  implements RefreshTokenInterfaceRepository
{
  constructor(dataSource: DataSource) {
    super(dataSource, RefreshToken);
  }

  async findOneByCondition(condition?: any): Promise<RefreshToken | null> {
    const where: any = {};

    if (condition?.userId) {
      where.userId = condition.userId;
    }
    if (condition?.ip) {
      where.ip = condition.ip;
    }
    if (condition?.userAgent) {
      where.userAgent = condition.userAgent;
    }
    if (condition?.revoked !== undefined) {
      where.revoked = condition.revoked;
    }

    return await this.repository.findOne({ where });
  }

  async updateManyByCondition(
    condition: {
      userId?: string;
      ip?: string;
      userAgent?: string;
      revoked?: boolean;
    },
    dto: Partial<RefreshToken> & {
      revoked?: boolean;
      expiresAt?: Date;
    },
  ): Promise<{ affected?: number }> {
    const where: Record<string, any> = {};

    if (condition?.userId) {
      where.userId = condition.userId;
    }
    if (condition?.ip) {
      where.ip = condition.ip;
    }
    if (condition?.userAgent) {
      where.userAgent = condition.userAgent;
    }
    if (condition?.revoked !== undefined) {
      where.revoked = condition.revoked;
    }

    return await this.repository.update(where, dto);
  }
}
