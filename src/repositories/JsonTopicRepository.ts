import { ITopicRepository } from '../interfaces/ITopicRepository';
import { Topic } from '../models/Topic';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(__dirname, '../../data/topics.json');

export class JsonTopicRepository implements ITopicRepository {
  private async readData(): Promise<Topic[]> {
    try {
      const data = await fs.readFile(DATA_FILE, 'utf-8');
      return JSON.parse(data) as Topic[];
    } catch {
      return [];
    }
  }

  private async writeData(topics: Topic[]): Promise<void> {
    await fs.writeFile(DATA_FILE, JSON.stringify(topics, null, 2), 'utf-8');
  }

  async getAll(): Promise<Topic[]> {
    return await this.readData();
  }

  async getById(id: string): Promise<Topic | null> {
    const topics = await this.readData();
    return topics.find(t => t.id === id) || null;
  }

  async getByParentId(parentId: string): Promise<Topic[]> {
    const topics = await this.readData();
    return topics.filter(t => t.parentTopicId === parentId);
  }

  async getVersionsByName(name: string): Promise<Topic[]> {
    const topics = await this.readData();
    return topics.filter(t => t.name === name);
  }

  async save(topic: Topic): Promise<void> {
    const topics = await this.readData();
    topics.push(topic);
    await this.writeData(topics);
  }
}