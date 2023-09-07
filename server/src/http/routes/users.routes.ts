import express from 'express';
import usersController from '../controllers/users.controller';

const router = express.Router();

router.get('/users/', usersController.index);
router.get('/users/:user', usersController.show);
router.post('/users/', usersController.store);
router.put('/users/:user', usersController.update);
router.delete('/users/:user', usersController.destroy);

export default router;
