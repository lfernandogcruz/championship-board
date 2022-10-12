import { Router } from 'express';
import LeaderboardController from '../controllers/Learderboard.controller';
import LeaderboardService from '../services/Leaderboard.service';

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/',
  (req, res) => leaderboardController.generalFindAll(req, res),
);

leaderboardRouter.get(
  '/home',
  (req, res) => leaderboardController.homeFindAll(req, res),
);

leaderboardRouter.get(
  '/away',
  (req, res) => leaderboardController.awayFindAll(req, res),
);

export default leaderboardRouter;
