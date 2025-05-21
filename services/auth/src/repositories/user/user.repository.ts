import { BaseRepositoryAbstract } from '../base-abstract.repository';
import { DataSource } from 'typeorm';
import { User } from '../../database/entities/user.entity';
import { UserInterfaceRepository } from './user.interface.repository';

export class UserRepository
  extends BaseRepositoryAbstract<User>
  implements UserInterfaceRepository
{
  constructor(dataSource: DataSource) {
    super(dataSource, User);
  }

  /**
   * Find user by identity (email, username, phone number)
   *
   * @param {String} identity
   * @returns {Promise<User | null>}
   */
  async findOneByIdentity(identity: string): Promise<User | null> {
    return this.repository
      .createQueryBuilder('user')
      .where(
        'user.email = :identity OR user.username = :identity OR user.phoneNumber = :identity',
        { identity },
      )
      .addSelect(['user.password'])
      .getOne();
  }

  async findById(id: string): Promise<User | null> {
    return await this.repository.findOne({
      where: { id },
      relations: [
        'userRoles',
        'userRoles.role',
        'userRoles.role.rolePermissions',
        'userRoles.role.rolePermissions.permission',
      ],
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({
      where: { email },
      relations: [
        'userRoles',
        'userRoles.role',
        'userRoles.role.rolePermissions',
        'userRoles.role.rolePermissions.permission',
      ],
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.repository.findOne({
      where: { username },
      relations: [
        'userRoles',
        'userRoles.role',
        'userRoles.role.rolePermissions',
        'userRoles.role.rolePermissions.permission',
      ],
    });
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return await this.repository.findOne({
      where: { phoneNumber },
      relations: [
        'userRoles',
        'userRoles.role',
        'userRoles.role.rolePermissions',
        'userRoles.role.rolePermissions.permission',
      ],
    });
  }

  async findByField(field: string, value: string): Promise<User | null> {
    return await this.repository.findOne({
      where: { [field]: value },
      relations: [
        'userRoles',
        'userRoles.role',
        'userRoles.role.rolePermissions',
        'userRoles.role.rolePermissions.permission',
      ],
    });
  }
}
