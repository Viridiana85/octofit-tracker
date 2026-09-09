import { Router } from 'express';
import { User } from '../models/User.js';

const usersRouter = Router();

usersRouter.get('/', async (_request, response) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    response.json(users);
  } catch (error) {
    response.status(500).json({ message: 'Failed to fetch users', error });
  }
});

export default usersRouter;