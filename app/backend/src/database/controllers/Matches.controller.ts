import { Request, Response } from 'express';
import teamIdValidation from '../helpers/teamIdValidation';
import MatchesService from '../services/Matches.service';
import constants from '../helpers/constants';
import IMatch from '../interfaces/IMatch';

class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async findAll(_req: Request, res: Response): Promise<Response> {
    const response = await this.matchesService.findAll();
    if (!response) {
      return res.status(404).json({ message: constants.error404Message });
    }
    return res.status(200).json(response);
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const response = await this.matchesService.findById(Number(id));
    if (!response) {
      return res.status(404).json({ message: constants.error404Message });
    }
    return res.status(200).json(response);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { homeTeam, awayTeam } = req.body;
    const teamAreValid = await teamIdValidation(homeTeam, awayTeam);
    if (!teamAreValid) {
      return res.status(404).json({ message: 'Team not found' });
    }
    const { homeTeamGoals, awayTeamGoals, inProgress } = req.body;
    const newMatch = {
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress };
    const response = await this.matchesService.create(newMatch) as IMatch;
    if (!response) {
      return res.status(404).json({ message: constants.error404Message });
    }
    return res.status(201).json(response);
  }
}

export default MatchesController;
