"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicService = void 0;
const Topic_1 = require("../models/Topic");
const crypto_1 = __importDefault(require("crypto"));
class TopicService {
    constructor(topicRepository) {
        this.topicRepository = topicRepository;
    }
    async createTopic(dto) {
        const now = new Date();
        const topic = new Topic_1.Topic({
            id: crypto_1.default.randomUUID(),
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
    async getAllTopics() {
        return await this.topicRepository.getAll();
    }
    async getTopicById(id) {
        return await this.topicRepository.getById(id);
    }
    async updateTopic(id, content) {
        const existingData = await this.topicRepository.getById(id);
        if (!existingData)
            return null;
        const existingTopic = new Topic_1.Topic(existingData);
        const newVersion = existingTopic.updateContent(content);
        await this.topicRepository.save(newVersion);
        return newVersion;
    }
    async getVersionsByName(name) {
        return await this.topicRepository.getVersionsByName(name);
    }
    async getTopicTreeById(id) {
        const allTopics = await this.topicRepository.getAll();
        const buildTree = (topicId) => {
            const topic = allTopics.find(t => t.id === topicId);
            if (!topic)
                return null;
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
    async findShortestPath(fromId, toId) {
        const topics = await this.topicRepository.getAll();
        const idMap = this.buildIdMap(topics);
        const graph = this.buildGraph(topics);
        return this.performBFS(fromId, toId, idMap, graph);
    }
    buildIdMap(topics) {
        const idMap = new Map();
        for (const topic of topics) {
            idMap.set(topic.id, topic);
        }
        return idMap;
    }
    buildGraph(topics) {
        const graph = new Map();
        for (const topic of topics) {
            if (!graph.has(topic.id))
                graph.set(topic.id, new Set());
            if (topic.parentTopicId) {
                graph.get(topic.id)?.add(topic.parentTopicId);
                if (!graph.has(topic.parentTopicId))
                    graph.set(topic.parentTopicId, new Set());
                graph.get(topic.parentTopicId)?.add(topic.id);
            }
        }
        return graph;
    }
    performBFS(fromId, toId, idMap, graph) {
        const queue = [[fromId]];
        const visited = new Set();
        while (queue.length > 0) {
            const path = queue.shift();
            const current = path[path.length - 1];
            if (current === toId) {
                return path.map(id => idMap.get(id));
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
exports.TopicService = TopicService;
