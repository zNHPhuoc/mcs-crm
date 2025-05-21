import { Seeder } from 'typeorm-extension';
import { DataSource, Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';

export default class PermissionSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const permissionRepo: Repository<Permission> =
      dataSource.getRepository(Permission);

    const permissions = [
      // pms for user
      { name: 'list user', code: 'user_list', description: 'List user' },
      { name: 'create user', code: 'user_create', description: 'Create user' },
      { name: 'update user', code: 'user_update', description: 'Update user' },
      { name: 'delete user', code: 'user_delete', description: 'Delete user' },
      {
        name: 'delete detail',
        code: 'user_detail',
        description: 'Detail user',
      },

      // pms for role
      { name: 'list role', code: 'role_list', description: 'List role' },
      { name: 'create role', code: 'role_create', description: 'Create role' },
      { name: 'update role', code: 'role_update', description: 'Update role' },
      { name: 'delete role', code: 'role_delete', description: 'Delete role' },
      {
        name: 'delete detail',
        code: 'role_detail',
        description: 'Detail role',
      },

      // pms for permission
      {
        name: 'list permission',
        code: 'permission_list',
        description: 'List permission',
      },
      {
        name: 'create permission',
        code: 'permission_create',
        description: 'Create permission',
      },
      {
        name: 'update permission',
        code: 'permission_update',
        description: 'Update permission',
      },
      {
        name: 'delete permission',
        code: 'permission_delete',
        description: 'Delete permission',
      },
      {
        name: 'delete detail',
        code: 'permission_detail',
        description: 'Detail permission',
      },
    ];

    await permissionRepo.upsert(permissions, ['code']);

    console.log('Permission seeder executed successfully.');
  }
}
