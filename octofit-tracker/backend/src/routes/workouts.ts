import { Router } from 'express';
import { Workout } from '../models/Workout.js';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_request, response) => {
  try {
    const workouts = await Workout.find().sort({ difficulty: 1, durationMinutes: 1 });
    response.json(workouts);
  } catch (error) {
    response.status(500).json({ message: 'Failed to fetch workouts', error });
  }
});

export default workoutsRouter;