import { UserDTO } from './users/dto/user.dto';

declare global {
  namespace Express {
    interface User extends UserDTO {}

    interface Request {
      token?: string;
      user?: any;
    }
  }
}
