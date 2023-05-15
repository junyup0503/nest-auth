import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UserRegisterDTO } from './dto/userRegister.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

class MockUsersRepository {
  save = jest.fn();
  findOne = jest.fn();
}

const mockConfigService = () => ({
  get: jest.fn().mockReturnValue('thisissecretkey'),
});

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: MockUsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService, // { provide : UsersService, useClass : UsersService }
        {
          provide: getRepositoryToken(UserEntity),
          useClass: MockUsersRepository,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService(),
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get(getRepositoryToken(UserEntity));
  });

  it('UsersService should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('registerUser', () => {
    const newUser: UserRegisterDTO = {
      userId: 'test',
      userPw: '9999',
      username: 'new',
    };

    it('should be defined', async () => {
      expect(usersService.registerUser).toBeDefined();
    });

    it('이미 존재하는 userId', async () => {
      usersRepository.findOne.mockResolvedValue(newUser);

      try {
        await usersService.registerUser(newUser);
      } catch (error) {
        expect(error.message).toBe('해당하는 이메일은 이미 존재합니다.');
      }
      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { userId: newUser.userId },
      });
    });

    it('유저 정보를 인자로 받고 새로운 유저 생성 후 유저 정보(pw제외) 반환', async () => {
      usersRepository.findOne.mockReturnValue(undefined);

      await usersService.registerUser(newUser);

      expect(usersRepository.save).toBeCalled();
    });
  });
});
