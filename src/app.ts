import express from 'express';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Define API routes
app.use('/api/tasks', taskRoutes);
app.use('/api', userRoutes);


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
