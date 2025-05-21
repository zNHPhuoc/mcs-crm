import 'dotenv/config';
import { runSeeders } from 'typeorm-extension';
import { AppDataSource } from '../../config/typeorm.config';
import UserSeeder from './user.seeder';
import RoleSeeder from './role.seeder';
import PermissionSeeder from './permission.seeder';

async function main() {
  await AppDataSource.initialize();
  await runSeeders(AppDataSource, {
    seeds: [UserSeeder, RoleSeeder, PermissionSeeder],
  });
  await AppDataSource.destroy();
}

main();
