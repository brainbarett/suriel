import express from 'express';
import usersController from '../controllers/users.controller';

const router = express.Router();

router.get('/users/', usersController.index);
router.post('/users/', usersController.store);
router.put('/users/:user', usersController.update);

export default router;
