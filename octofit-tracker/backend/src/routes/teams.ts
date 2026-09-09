import { Router } from 'express';
import { Team } from '../models/Team.js';

const teamsRouter = Router();

teamsRouter.get('/', async (_request, response) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 });
    response.json(teams);
  } catch (error) {
    response.status(500).json({ message: 'Failed to fetch teams', error });
  }
});

export default teamsRouter;