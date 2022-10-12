import { Request, Response } from 'express';
import teamIdValidation from '../helpers/teamIdValidation';
import MatchesService from '../services/Matches.service';
import constants from '../helpers/constants';
import IMatch from '../interfaces/IMatch';
import IQueryProgress from '../interfaces/IQueryProgress';

class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async findAll(req: Request, res: Response): Promise<Response> {
    const { query } = req; // ---> inProgress: true
    let response = [] as unknown as IMatch[];
    if (query === undefined) {
      response = await this.matchesService.findAll() as IMatch[];
    }
    if (query !== undefined) {
      response = await this.matchesService
        .findAllQuery(query as unknown as IQueryProgress) as IMatch[];
    }
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
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    const { homeTeamGoals, awayTeamGoals, inProgress } = req.body;
    if (inProgress === false) {
      return res.status(406).json({ message: 'You can not create a finished match!' });
    }
    const newMatch = {
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress };
    const response = await this.matchesService.create(newMatch) as IMatch;
    if (!response) {
      return res.status(404).json({ message: constants.error404Message });
    }
    return res.status(201).json(response);
  }

  public async finishMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const response = await this.matchesService.finishMatch(Number(id));
    if (!response) {
      return res.status(404).json({ message: constants.error404Message });
    }
    return res.status(200).json({ message: 'Finished' });
  }

  public async updateScoreMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const ID = Number(id);
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const response = await this.matchesService.updateScoreMatch(ID, homeTeamGoals, awayTeamGoals);
    if (!response) {
      return res.status(404).json({ message: constants.error404Message });
    }
    return res.status(200).json(response);
  }
}

export default MatchesController;
