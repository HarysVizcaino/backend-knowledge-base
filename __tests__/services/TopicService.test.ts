import { TopicService } from '../../src/services/TopicService';
import { ITopicRepository } from '../../src/interfaces/ITopicRepository';
import { Topic } from '../../src/models/Topic';

const mockTopicRepository: jest.Mocked<ITopicRepository> = {
  getAll: jest.fn(),
  getById: jest.fn(),
  save: jest.fn(),
  getVersionsByName: jest.fn(),
  getByParentId: jest.fn(),
};

describe('TopicService', () => {
  const service = new TopicService(mockTopicRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new topic', async () => {
    const dto = {
      name: 'Test Topic',
      content: 'Test content',
      parentTopicId: undefined,
    };

    const topic = await service.createTopic(dto);

    expect(topic.name).toBe(dto.name);
    expect(topic.content).toBe(dto.content);
    expect(topic.version).toBe(1);
    expect(mockTopicRepository.save).toHaveBeenCalledWith(expect.objectContaining({
      name: dto.name,
      content: dto.content
    }));
  });

  it('should get all topics', async () => {
    const topics = [{ id: '1', name: 'Topic1' }] as Topic[];
    mockTopicRepository.getAll.mockResolvedValue(topics);

    const result = await service.getAllTopics();
    expect(result).toEqual(topics);
  });

  it('should get topic by ID', async () => {
    const topic = { id: '1', name: 'Topic1' } as Topic;
    mockTopicRepository.getById.mockResolvedValue(topic);

    const result = await service.getTopicById('1');
    expect(result).toEqual(topic);
  });

  it('should return null when updating a non-existent topic', async () => {
    mockTopicRepository.getById.mockResolvedValue(null);
    const result = await service.updateTopic('999', 'New content');
    expect(result).toBeNull();
  });

  it('should call getVersionsByName', async () => {
    const topics = [{ id: '1', name: 'v1' }] as Topic[];
    mockTopicRepository.getVersionsByName.mockResolvedValue(topics);

    const result = await service.getVersionsByName('v1');
    expect(result).toEqual(topics);
  });
});