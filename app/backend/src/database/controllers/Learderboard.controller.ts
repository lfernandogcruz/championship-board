import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';
// import constants from '../helpers/constants';

class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public async homeFindAll(_req: Request, res: Response): Promise<Response> {
    const leaderboard = await this.leaderboardService.homeFindAll();
    return res.status(200).json(leaderboard);
  }

  public async awayFindAll(_req: Request, res: Response): Promise<Response> {
    const leaderboard = await this.leaderboardService.awayFindAll();
    return res.status(200).json(leaderboard);
  }

  public async generalFindAll(_req: Request, res: Response): Promise<Response> {
    const leaderboard = await this.leaderboardService.generalFindAll();
    return res.status(200).json(leaderboard);
  }
}

export default LeaderboardController;
