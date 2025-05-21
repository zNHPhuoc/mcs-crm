import { BaseRepositoryInterface } from '../base-interface.repository';
import { User } from '../../database/entities/user.entity';

export interface UserInterfaceRepository extends BaseRepositoryInterface<User> {
  findOneByIdentity(identity: string): Promise<User | null>;

  findById(id: string): Promise<User | null>;

  findByEmail(email: string): Promise<User | null>;

  findByUsername(username: string): Promise<User | null>;

  findByPhoneNumber(phoneNumber: string): Promise<User | null>;

  findByField(field: string, value: string): Promise<User | null>;
}
