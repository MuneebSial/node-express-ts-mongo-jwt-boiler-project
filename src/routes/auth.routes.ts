import { Router } from 'express';
import { body } from 'express-validator';
import { serviceRegistry } from '@/config/serviceRegistry';
import { validateRequest } from '@/middlewares/validateRequest';
import { AuthController } from '@/controllers/auth.controller';
import { AuthService } from '@/services/auth.service';
import { UserService } from '@/services/user.service';

// Get services from the service registry
const authService = serviceRegistry.get<AuthService>('AuthService');
const userService = serviceRegistry.get<UserService>('UserService');

// Instantiate the controller and inject the service
const authController = new AuthController(authService, userService);

const router = Router();

// Login with Email
router.post(
  '/login',
  [
    body('email')
      .trim()
      .toLowerCase()
      .isEmail()
      .withMessage('Enter a valid email address'),
    body('password').notEmpty().withMessage('Password must be provided'),
  ],
  validateRequest,
  authController.authenticateUser,
);

export { router as authRoutes };
