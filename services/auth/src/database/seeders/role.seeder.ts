import { Seeder } from 'typeorm-extension';
import { DataSource, Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

export default class RoleSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const roleRepo: Repository<Role> = dataSource.getRepository(Role);

    const roles = [
      { name: 'super admin', code: 'sa', description: 'Super Admin' },
      { name: 'admin', code: 'admin', description: 'Administrator' },
      { name: 'user', code: 'user', description: 'Regular User' },
      { name: 'guest', code: 'guest', description: 'Guest User' },
    ];

    await roleRepo.upsert(roles, ['code']);

    console.log('Role seeder executed successfully.');
  }
}
