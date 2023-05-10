import { Exclude } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, Index } from 'typeorm';

import { CommonEntity } from '../../common/entities/common.entity';

@Index('userId', ['userId'], { unique: true })
@Entity({
  name: 'USER',
})
export class UserEntity extends CommonEntity {
  @IsString()
  @IsNotEmpty({ message: '아이디를 작성해주세요' })
  @Column({ type: 'varchar', unique: true, nullable: false })
  userId: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: false })
  userPw: string;

  @IsString()
  @Column({ type: 'varchar', nullable: true })
  username: string;

  @IsBoolean()
  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;
}
