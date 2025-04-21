import express from 'express';
import {
  createTask,
  getTasks,
  updateTask,
  getAllTasks
} from '../controllers/taskController';

const router = express.Router();

router.post('/', createTask);
router.get('/', getTasks);         // GET /tasks?userId=&role=&status=
router.get('/all', getAllTasks);   // GET /tasks/all ← this is the new one
router.put('/:id', updateTask);

export default router;
//curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d "{\"name\":\"John Doe\", \"email\":\"johnasf@example.com\", \"role\":\"ASSIGNER\"}"
//curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d "{\"title\":\"new Task 1\",\"description\":\"This is the new  task.\",\"priority\":\"MEDIUM\",\"dueDate\":\"2025-05-10T10:00:00Z\",\"assignerId\":\"687a6559-6535-4726-94a1-d763b973c3eb\",\"doerId\":\"4c6f4d4e-a3f5-4762-8585-d6d74518caf5\"}"