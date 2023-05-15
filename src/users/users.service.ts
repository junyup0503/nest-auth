import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { UserDTO } from './dto/user.dto';
import { UserRegisterDTO } from './dto/userRegister.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async registerUser(userRegisterDTO: UserRegisterDTO) {
    const { userId, userPw } = userRegisterDTO;
    const user = await this.usersRepository.findOne({ where: { userId } });
    if (user) {
      throw new UnauthorizedException('해당하는 이메일은 이미 존재합니다.');
    }
    const hashedPassword = await bcrypt.hash(userPw, 10);
    await this.usersRepository.save({
      ...userRegisterDTO,
      userPw: hashedPassword,
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
