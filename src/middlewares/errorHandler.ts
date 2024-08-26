import { Request, Response, NextFunction } from 'express';
import { logger } from '@/config/logger';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
};
