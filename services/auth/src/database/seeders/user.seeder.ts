// src/database/seeders/user.seeder.ts
import { Seeder } from 'typeorm-extension';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserStatus } from '../../common/enums/user.enum';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const userRepo: Repository<User> = dataSource.getRepository(User);

    const user = {
      username: 'super_admin',
      email: 'superadmin@gmail.com',
      password: await bcrypt.hash('admin123', 10),
      fullName: 'Super Admin',
      status: UserStatus.ACTIVE,
      phoneNumber: '0000000000',
    } as User;

    const findUser = await userRepo.findOne({
      where: { username: user.username },
    });

    if (findUser) {
      console.log('User already exists. Skipping seeder.');
      return;
    }

    await userRepo.insert(user);

    console.log('User seeder executed successfully.');
  }
}
