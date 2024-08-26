import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
import connectToDatabase from '@/config/mongodb';
import { logger } from '@/config/logger';
import { serviceRegistry } from '@/config/serviceRegistry';
import { authRoutes } from '@/routes/auth.routes';
import { errorHandler } from '@/middlewares/errorHandler';
import { AuthService } from '@/services/auth.service';
import { UserService } from '@/services/user.service';
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

// Default route for non-existing routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).send({
    message: 'Resource not found',
  });
});

// Register services
serviceRegistry.register('AuthService', new AuthService());
serviceRegistry.register('UserService', new UserService());

// redirecting to corresponding routes
app.use('api/auth', authRoutes);

app.use(errorHandler);

// Database connection and server start
(async () => {
  try {
    await connectToDatabase(process.env.MONGODB_URI!);
    logger.info('Database connected successfully.');
    app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.info('Failed to connect to the database:', error);
    process.exit(1); // Exit process with failure
  }
})();
