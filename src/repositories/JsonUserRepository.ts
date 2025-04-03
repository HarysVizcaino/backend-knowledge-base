import fs from 'fs/promises';
import path from 'path';
import { User } from '../models/User';

const DATA_FILE = path.join(__dirname, '../../data/users.json');

export class JsonUserRepository {
  async getAll(): Promise<User[]> {
    try {
      const data = await fs.readFile(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const users = await this.getAll();
    return users.find(u => u.email === email);
  }

  async save(user: User): Promise<void> {
    const users = await this.getAll();
    users.push(user);
    await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), 'utf-8');
  }
}