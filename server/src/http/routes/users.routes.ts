import express from 'express';
import usersController from '../controllers/users.controller';

const router = express.Router();

router.route('/users').post(usersController.store);

export default router;
