import User, { IUser } from '@/models/User';

export class UserService {
  constructor() {}

  getAll() {}

  getById(id: string) {}

  async getByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email: email });
  }
}
