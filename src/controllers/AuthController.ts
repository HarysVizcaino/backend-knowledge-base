import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

const authService = new AuthService();

export class AuthController {
  login = async (req: Request, res: Response, next: Function) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
      const token = await authService.login(email, password);
      return res.json({ token });
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  };

  register = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
  
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
      const token = await authService.register(name, email, password, role);
      return res.status(201).json({ token });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };
  
}