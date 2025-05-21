import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Hashing {
  async comparePassword(
    plainPassword: string,
    password: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, password);
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = parseInt(process.env.HASH_SALT || '10', 10);
    return await bcrypt.hash(password, saltRounds);
  }
}
