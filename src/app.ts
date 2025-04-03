import express from 'express';
import topicRoutes from './routes/TopicRoutes';
import authRoutes from './routes/AuthRoutes';
import { authMiddleware } from './middleware/authMiddleware';


const runAuthMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => { 
    authMiddleware(req, res, next);
}

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);

app.use('/topics', runAuthMiddleware, topicRoutes);

export default app;