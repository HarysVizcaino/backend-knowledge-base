import { Topic } from '../models/Topic';
import { ITopicRepository } from '../interfaces/ITopicRepository';
import crypto from 'crypto';

interface CreateTopicDTO {
  name: string;
  content: string;
  parentTopicId?: string;
}

export class TopicService {
  constructor(private readonly topicRepository: ITopicRepository) {}

  async createTopic(dto: CreateTopicDTO): Promise<Topic> {
    const now = new Date();
    const topic = new Topic({
      id: crypto.randomUUID(),
      name: dto.name,
      content: dto.content,
      parentTopicId: dto.parentTopicId,
      createdAt: now,
      updatedAt: now,
      version: 1,
    });

    await this.topicRepository.save(topic);
    return topic;
  }

  async getAllTopics(): Promise<Topic[]> {
    return await this.topicRepository.getAll();
  }

  async getTopicById(id: string): Promise<Topic | null> {
    return await this.topicRepository.getById(id);
  }

  async updateTopic(id: string, content: string): Promise<Topic | null> {
    const existingData = await this.topicRepository.getById(id);
    if (!existingData) return null;
  
    const existingTopic = new Topic(existingData);

    const newVersion = existingTopic.updateContent(content);
    await this.topicRepository.save(newVersion);
  
    return newVersion;
  }
  
  async getVersionsByName(name: string): Promise<Topic[]> {
    return await this.topicRepository.getVersionsByName(name);
  }

  async getTopicTreeById(id: string): Promise<any> {
    const allTopics = await this.topicRepository.getAll();
  
    const buildTree = (topicId: string): any => {
      const topic = allTopics.find(t => t.id === topicId);
      if (!topic) return null;
  
      const children = allTopics
        .filter(t => t.parentTopicId === topicId)
        .map(child => buildTree(child.id));
  
      return {
        ...topic,
        children
      };
    };
  
    return buildTree(id);
  }

  async findShortestPath(fromId: string, toId: string): Promise<Topic[] | null> {
    const topics = await this.topicRepository.getAll();
    const idMap = this.buildIdMap(topics);
    const graph = this.buildGraph(topics);
    return this.performBFS(fromId, toId, idMap, graph);
  }

  private buildIdMap(topics: Topic[]): Map<string, Topic> {
    const idMap = new Map<string, Topic>();
    for (const topic of topics) {
      idMap.set(topic.id, topic);
    }
    return idMap;
  }

  private buildGraph(topics: Topic[]): Map<string, Set<string>> {
    const graph = new Map<string, Set<string>>();
    for (const topic of topics) {
      if (!graph.has(topic.id)) graph.set(topic.id, new Set());
      if (topic.parentTopicId) {
        graph.get(topic.id)?.add(topic.parentTopicId);

        if (!graph.has(topic.parentTopicId)) graph.set(topic.parentTopicId, new Set());
        graph.get(topic.parentTopicId)?.add(topic.id);
      }
    }
    return graph;
  }

  private performBFS(
    fromId: string,
    toId: string,
    idMap: Map<string, Topic>,
    graph: Map<string, Set<string>>
  ): Topic[] | null {
    const queue: string[][] = [[fromId]];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const path = queue.shift()!;
      const current = path[path.length - 1];

      if (current === toId) {
        return path.map(id => idMap.get(id)!);
      }

      if (!visited.has(current)) {
        visited.add(current);
        for (const neighbor of graph.get(current) || []) {
          if (!visited.has(neighbor)) {
            queue.push([...path, neighbor]);
          }
        }
      }
    }

    return null; // no path found
  }
  
}