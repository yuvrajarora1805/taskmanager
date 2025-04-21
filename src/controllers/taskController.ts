import { Request, Response } from 'express';
import prisma from '../prisma/client';

// Create a task
export const createTask = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log('Received task creation data:', req.body);

    const { title, description, priority, dueDate, assignerId, doerId } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        dueDate: new Date(dueDate),
        assignerId,
        doerId,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Create Task Error:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Get all tasks (no filters)
export const getAllTasks = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log('Fetching all tasks');
    
    const tasks = await prisma.task.findMany();

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Get All Tasks Error:', error);
    res.status(500).json({ error: 'Failed to fetch all tasks' });
  }
};

// Get tasks with filtering
export const getTasks = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId, role, status } = req.query;

    type TaskFilter = {
      assignerId?: string;
      doerId?: string;
      status?: any;
    };

    const filter: TaskFilter = {};

    if (userId && role === 'ASSIGNER') {
      filter.assignerId = String(userId);
    } else if (userId && role === 'DOER') {
      filter.doerId = String(userId);
    }

    if (status) {
      filter.status = status;
    }

    console.log('Task filter:', filter);

    const tasks = await prisma.task.findMany({
      where: Object.keys(filter).length ? filter : undefined,
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Get Tasks Error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// Update a task
export const updateTask = async (req: Request, res: Response): Promise<any> => {
  try {
    const { status, blocked, blockedReason } = req.body;

    console.log('Updating task:', req.params.id);
    console.log('Update data:', { status, blocked, blockedReason });

    const task = await prisma.task.update({
      where: { id: req.params.id },
      data: { status, blocked, blockedReason },
    });

    res.status(200).json(task);
  } catch (error) {
    console.error('Update Task Error:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
};
