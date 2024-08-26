import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AuthService } from '@/services/auth.service';
import { UserService } from '@/services/user.service';

export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    this.authService = authService;
    this.userService = userService;
  }

  async authenticateUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await this.userService.getByEmail(email);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        message: `Invalid email or password`,
      });
    }

    const isValidPass = this.authService.authenticateUserPassword(
      user.password,
      password,
    );

    if (!isValidPass) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        message: `Invalid password`,
      });
    }

    const response = {
      access_token: user.generateAuthToken(),
    };

    res.status(StatusCodes.OK).json(response);
  }
}
