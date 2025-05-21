import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInterfaceRepository } from '../../repositories/user/user.interface.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserInterfaceRepository')
    private readonly userRepository: UserInterfaceRepository,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return await this.findOne('b6f45087-6ea7-4a31-81ef-feee8fa49007');
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findById(id);

      if (!user) {
        throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (e) {
      throw e;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
