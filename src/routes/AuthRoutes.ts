import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const router = Router();
const controller = new AuthController();

router.post('/login', (req, res, next) => {
    controller.login(req, res, next);
});

router.post('/register', (req, res) => {
    controller.register(req, res);
});

export default router;