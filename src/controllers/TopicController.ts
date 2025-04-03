import { Request, Response } from 'express';
import { TopicService } from '../services/TopicService';
import { RequireRole } from '../patterns/roles/RequireRoleDecorator';

export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  // Create a new topic

  @RequireRole('Admin', 'Editor')
  async createTopic(req: Request, res: Response, next: Function){
    try {
      const { name, content, parentTopicId } = req.body;

      const topic = await this.topicService.createTopic({ name, content, parentTopicId });

      return res.status(201).json(topic);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  // Get topic by ID
  @RequireRole('Admin', 'Editor', 'Viewer')
  async getTopicById(req: Request, res: Response, next: Function){
    try {
      const topicId = req.params.id;

      const topic = await this.topicService.getTopicById(topicId);
      if (!topic) return res.status(404).json({ message: 'Topic not found' });

      return res.status(200).json(topic);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  // Get all topics
  @RequireRole('Admin', 'Editor', 'Viewer')
  async getAllTopics(req: Request, res: Response, next: Function) {
    try {
      const topics = await this.topicService.getAllTopics();
      return res.status(200).json(topics);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  // Update topic
  @RequireRole('Admin', 'Editor')
  async updateTopic(req: Request, res: Response, next: Function) {
    try {
      const topicId = req.params.id;
      const { content } = req.body;
  
      const updated = await this.topicService.updateTopic(topicId, content);
      if (!updated) return res.status(404).json({ message: 'Topic not found' });
  
      return res.status(200).json(updated);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };


// Get all versions of a topic by name
@RequireRole('Admin', 'Editor', 'Viewer')
async getTopicVersions(req: Request, res: Response, next: Function){
    try {
      const { name } = req.params;
      const versions = await this.topicService.getVersionsByName(name);
      return res.status(200).json(versions);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  // ge tree topic
  @RequireRole('Admin', 'Editor', 'Viewer')
  async getTopicTree(req: Request, res: Response, next: Function){
    try {
      const topicId = req.params.id;
      const tree = await this.topicService.getTopicTreeById(topicId);
  
      if (!tree) return res.status(404).json({ message: 'Topic not found' });
  
      return res.status(200).json(tree);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  @RequireRole('Admin', 'Editor', 'Viewer')
  async findShortestPath(req: Request, res: Response, next: Function){
    try {
      const { from, to } = req.query;
      if (typeof from !== 'string' || typeof to !== 'string') {
        return res.status(400).json({ error: 'Both "from" and "to" query params are required.' });
      }
  
      const path = await this.topicService.findShortestPath(from, to);
  
      if (!path) return res.status(404).json({ message: 'No path found between topics' });
  
      return res.status(200).json(path);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

}