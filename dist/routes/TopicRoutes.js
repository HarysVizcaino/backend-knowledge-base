"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TopicController_1 = require("../controllers/TopicController");
const TopicService_1 = require("../services/TopicService");
const JsonTopicRepository_1 = require("../repositories/JsonTopicRepository"); // We'll implement this soon
const router = (0, express_1.Router)();
// Dependency Injection
const topicRepository = new JsonTopicRepository_1.JsonTopicRepository();
const topicService = new TopicService_1.TopicService(topicRepository);
const topicController = new TopicController_1.TopicController(topicService);
// Routes
router.get('/path', (req, res, next) => {
    topicController.findShortestPath(req, res, next);
});
router.post('/', (req, res, next) => {
    topicController.createTopic(req, res, next);
});
router.get('/', (req, res, next) => {
    topicController.getAllTopics(req, res, next);
});
router.get('/:id', (req, res, next) => {
    topicController.getTopicById(req, res, next);
});
router.put('/:id', (req, res, next) => {
    topicController.updateTopic(req, res, next);
});
router.get('/versions/:name', (req, res, next) => {
    topicController.getTopicVersions(req, res, next);
});
router.get('/:id/tree', (req, res, next) => {
    topicController.getTopicTree(req, res, next);
});
exports.default = router;
