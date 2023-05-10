import { OmitType } from '@nestjs/swagger';

import { UserEntity } from '../entities/user.entity';

export class UserDTO extends OmitType(UserEntity, ['userPw'] as const) {}
