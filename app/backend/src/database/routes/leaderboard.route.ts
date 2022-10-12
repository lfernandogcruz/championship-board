import { Router } from 'express';
import LeaderboardController from '../controllers/Learderboard.controller';
import LeaderboardService from '../services/Leaderboard.service';

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/home',
  (req, res) => leaderboardController.homeFindAll(req, res),
);

export default leaderboardRouter;
