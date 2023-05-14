import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { UserEntity } from '../entities/user.entity';

export class UserRegisterDTO extends PickType(UserEntity, [
  'userId',
  'username',
] as const) {
  @IsString()
  @IsNotEmpty({ message: '비밀번호를 작성해주세요.' })
  userPw: string;
}
