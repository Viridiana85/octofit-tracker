import { Router } from 'express';
import { Activity } from '../models/Activity.js';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_request, response) => {
  try {
    const activities = await Activity.find().sort({ date: -1 });
    response.json(activities);
  } catch (error) {
    response.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

export default activitiesRouter;