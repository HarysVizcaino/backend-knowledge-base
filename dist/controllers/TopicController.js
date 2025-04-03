"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicController = void 0;
const RequireRoleDecorator_1 = require("../patterns/roles/RequireRoleDecorator");
class TopicController {
    constructor(topicService) {
        this.topicService = topicService;
    }
    // Create a new topic
    async createTopic(req, res, next) {
        try {
            const { name, content, parentTopicId } = req.body;
            const topic = await this.topicService.createTopic({ name, content, parentTopicId });
            return res.status(201).json(topic);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    ;
    // Get topic by ID
    async getTopicById(req, res, next) {
        try {
            const topicId = req.params.id;
            const topic = await this.topicService.getTopicById(topicId);
            if (!topic)
                return res.status(404).json({ message: 'Topic not found' });
            return res.status(200).json(topic);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    ;
    // Get all topics
    async getAllTopics(req, res, next) {
        try {
            const topics = await this.topicService.getAllTopics();
            return res.status(200).json(topics);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    ;
    // Update topic
    async updateTopic(req, res, next) {
        try {
            const topicId = req.params.id;
            const { content } = req.body;
            const updated = await this.topicService.updateTopic(topicId, content);
            if (!updated)
                return res.status(404).json({ message: 'Topic not found' });
            return res.status(200).json(updated);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    ;
    // Get all versions of a topic by name
    async getTopicVersions(req, res, next) {
        try {
            const { name } = req.params;
            const versions = await this.topicService.getVersionsByName(name);
            return res.status(200).json(versions);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    ;
    // ge tree topic
    async getTopicTree(req, res, next) {
        try {
            const topicId = req.params.id;
            const tree = await this.topicService.getTopicTreeById(topicId);
            if (!tree)
                return res.status(404).json({ message: 'Topic not found' });
            return res.status(200).json(tree);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    ;
    async findShortestPath(req, res, next) {
        try {
            const { from, to } = req.query;
            if (typeof from !== 'string' || typeof to !== 'string') {
                return res.status(400).json({ error: 'Both "from" and "to" query params are required.' });
            }
            const path = await this.topicService.findShortestPath(from, to);
            if (!path)
                return res.status(404).json({ message: 'No path found between topics' });
            return res.status(200).json(path);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    ;
}
exports.TopicController = TopicController;
__decorate([
    (0, RequireRoleDecorator_1.RequireRole)('Admin', 'Editor'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], TopicController.prototype, "createTopic", null);
__decorate([
    (0, RequireRoleDecorator_1.RequireRole)('Admin', 'Editor', 'Viewer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], TopicController.prototype, "getTopicById", null);
__decorate([
    (0, RequireRoleDecorator_1.RequireRole)('Admin', 'Editor', 'Viewer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], TopicController.prototype, "getAllTopics", null);
__decorate([
    (0, RequireRoleDecorator_1.RequireRole)('Admin', 'Editor'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], TopicController.prototype, "updateTopic", null);
__decorate([
    (0, RequireRoleDecorator_1.RequireRole)('Admin', 'Editor', 'Viewer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], TopicController.prototype, "getTopicVersions", null);
__decorate([
    (0, RequireRoleDecorator_1.RequireRole)('Admin', 'Editor', 'Viewer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], TopicController.prototype, "getTopicTree", null);
__decorate([
    (0, RequireRoleDecorator_1.RequireRole)('Admin', 'Editor', 'Viewer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], TopicController.prototype, "findShortestPath", null);
