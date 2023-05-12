import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { UsersService } from './users.service';

const mockUserId = 'fdsafj123-3211vcxz-4122-fdasvcxz123';

const userPw = '1234';
const mockUser = {
  id: mockUserId,
  userId: 'wnsduqwnsduq',
  userPw: bcrypt.hashSync(userPw, 10),
  username: 'wnsduq',
  isAdmin: false,
};
class MockUsersRepository {
  save = jest.fn().mockResolvedValue(mockUser);

  async findOne(where: { id?: string; username?: string }) {
    if (where?.id === mockUserId) return mockUser;
    else if (where?.username === mockUser.username) return mockUser;
    else return null;
  }
}

describe('UsersService', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  it('UsersService should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('registerUser', () => {
    it('should be defined', async () => {
      expect(userService.create).toBeDefined();
    });

    it('이미 존재하는 userId');

    it('유저 정보를 인자로 받고 새로운 유저 생성 후 유저 정보(pw제외) 반환');
  });
});
