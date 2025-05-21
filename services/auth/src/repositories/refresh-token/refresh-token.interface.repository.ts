import { BaseRepositoryInterface } from '../base-interface.repository';
import { RefreshToken } from '../../database/entities/refresh-token.entity';

export interface RefreshTokenInterfaceRepository
  extends BaseRepositoryInterface<RefreshToken> {
  findOneByCondition(condition?: any): Promise<RefreshToken | null>;

  updateManyByCondition(
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
  ): Promise<{ affected?: number }>;
}
