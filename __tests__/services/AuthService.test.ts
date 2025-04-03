import { AuthService } from '../../src/services/AuthService';
import { JsonUserRepository } from '../../src/repositories/JsonUserRepository';
import bcrypt from 'bcrypt';
import { User } from '../../src/models/User';

jest.mock('../../src/repositories/JsonUserRepository');
jest.mock('bcrypt');

const mockUserRepo = new JsonUserRepository() as jest.Mocked<JsonUserRepository>;

describe('AuthService', () => {
  const authService = new AuthService();
  (authService as any).userRepository = mockUserRepo;

  it('should return a token for valid user credentials', async () => {
    const mockUser: User = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'Editor',
      password: 'hashed-password'
    };

    mockUserRepo.findByEmail.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const token = await authService.login('test@example.com', 'plain-text');
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(10);
  });

  it('should throw if user does not exist', async () => {
    mockUserRepo.findByEmail.mockResolvedValue(undefined);
    await expect(authService.login('missing@example.com', 'any')).rejects.toThrow(
      'Invalid email or password'
    );
  });

  it('should throw if password is invalid', async () => {
    mockUserRepo.findByEmail.mockResolvedValue({
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'Editor',
      password: 'hashed-password'
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(authService.login('test@example.com', 'wrong')).rejects.toThrow(
      'Invalid email or password'
    );
  });
});