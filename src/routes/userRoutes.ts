// routes/userRoutes.ts
import { Router, RequestHandler } from 'express';
import {
  createUserHandler,
  getUserTasksHandler,
  getUsersHandler,
  updateTaskStatusHandler
} from '../controllers/userController';

const router = Router();

router.post('/users', (createUserHandler as unknown) as RequestHandler);
router.get('/users', (getUsersHandler as unknown) as RequestHandler);
router.get('/users/:userId/tasks', (getUserTasksHandler as unknown) as RequestHandler);
router.put('/tasks/:id', (updateTaskStatusHandler as unknown) as RequestHandler);
export default router;
