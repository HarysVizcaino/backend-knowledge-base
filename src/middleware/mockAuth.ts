import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

// You can change this mock user to test different roles
const mockUser: User = {
  id: 'u1',
  name: 'Alice',
  email: 'alice@example.com',
  role: 'Viewer' // Change to 'Viewer' or 'Admin' to test
};

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const mockAuth = (_req: Request, _res: Response, next: NextFunction) => {
  _req.user = mockUser;
  next();
};