import { Topic } from '../models/Topic';

export interface ITopicRepository {
  getAll(): Promise<Topic[]>;
  getById(id: string): Promise<Topic | null>;
  getByParentId(parentId: string): Promise<Topic[]>;
  getVersionsByName(name: string): Promise<Topic[]>;
  save(topic: Topic): Promise<void>;
}