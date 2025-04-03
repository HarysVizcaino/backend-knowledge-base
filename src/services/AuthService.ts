import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, UserRole } from '../models/User';
import { JsonUserRepository } from '../repositories/JsonUserRepository';

const JWT_SECRET = process.env.JWT_SECRET ?? 'default-secret';

export class AuthService {

  private readonly userRepository = new JsonUserRepository();
  
  generateToken(user: User): string {
    return jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      {
        expiresIn: '1h' // Token expiration time
      }
    );
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('Invalid email or password');
    console.log(user);
    console.log(password);
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid email or password');

    return this.generateToken(user);
  }

  async register(
    name: string,
    email: string,
    password: string,
    role: UserRole
  ): Promise<string> {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) throw new Error('User already exists');
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user: User = {
      id: crypto.randomUUID(),
      name,
      email,
      role,
      password: hashedPassword
    };
  
    await this.userRepository.save(user);
  
    return this.generateToken(user);
  }

  verifyToken(token: string): User {
    return jwt.verify(token, JWT_SECRET) as User;
  }
}