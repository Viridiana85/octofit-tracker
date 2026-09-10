import { Router } from 'express';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_request, response) => {
  try {
    const leaderboard = await LeaderboardEntry.find().sort({ points: -1, rank: 1 });
    response.json(leaderboard);
  } catch (error) {
    response.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
});

export default leaderboardRouter;