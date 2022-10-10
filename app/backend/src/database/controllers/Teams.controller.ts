import { Request, Response } from 'express';
import constants from '../helpers/constants';
import TeamsService from '../services/Teams.service';

class TeamsController {
  constructor(private teamsService = new TeamsService()) {}

  public async findAll(req: Request, res: Response): Promise<Response> {
    const response = await this.teamsService.findAll();
    if (!response) {
      return res.status(404).json({ message: constants.error404Message });
    }
    return res.status(200).json(response);
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const response = await this.teamsService.findById(Number(id));
    if (!response) {
      return res.status(404).json({ message: constants.error404Message });
    }
    return res.status(200).json(response);
  }
}

export default TeamsController;
