import { Request, Response } from 'express';
import prisma from '../prisma/client';

// Create a new user
export const createUserHandler = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, role } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { name, email, role },
    });
    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create user' });
  }
};

// Get all users
export const getUsersHandler = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Get tasks related to a user
export const getUserTasksHandler = async (req: Request, res: Response): Promise<Response> => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        tasksAssigned: true,
        tasksReceived: true,
      },
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    return res.status(200).json({
      assignedTasks: user.tasksAssigned,
      receivedTasks: user.tasksReceived,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch user tasks' });
  }
};

// Update task status by ID
export const updateTaskStatusHandler = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ['pending', 'in_progress', 'completed'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { status },
    });

    return res.status(200).json(updatedTask);
  } catch (error: any) {
    console.error(error);

    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Task not found' });
    }

    return res.status(500).json({ error: 'Failed to update task status' });
  }
};
