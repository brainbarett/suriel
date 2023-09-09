import express from 'express';
import authController from '../controllers/auth.controller';
import authenticate from '../middleware/authenticate';

const router = express.Router();

router.post('/auth/login', authController.login);
router.get('/auth/authenticated', authenticate, authController.authenticated);
router.post('/auth/logout', authenticate, authController.logout);

export default router;
