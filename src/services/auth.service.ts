import bcrypt from 'bcrypt';

export class AuthService {
  constructor() {}

  async authenticateUserPassword(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, userPassword);
  }
}
