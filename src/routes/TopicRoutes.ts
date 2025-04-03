import { Router } from 'express';
import { TopicController } from '../controllers/TopicController';
import { TopicService } from '../services/TopicService';
import { JsonTopicRepository } from '../repositories/JsonTopicRepository'; // We'll implement this soon

const router = Router();

// Dependency Injection
const topicRepository = new JsonTopicRepository();
const topicService = new TopicService(topicRepository);
const topicController = new TopicController(topicService);

// Routes
router.get('/path', (req, res, next) => {
    console.log('Finding shortest path');
    topicController.findShortestPath(req, res,  next);
});

router.post('/', (req, res, next) => {
    topicController.createTopic(req, res, next)
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

export default router;