import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserRepository } from '../../repositories/user/user.repository';
import { RefreshTokenRepository } from '../../repositories/refresh-token/refresh-token.repository';

export const repositoryProvider: Provider[] = [
  {
    provide: 'UserInterfaceRepository',
    useFactory: (dataSource: DataSource) => new UserRepository(dataSource),
    inject: [DataSource],
  },
  {
    provide: 'RefreshTokenInterfaceRepository',
    useFactory: (dataSource: DataSource) =>
      new RefreshTokenRepository(dataSource),
    inject: [DataSource],
  },
];
