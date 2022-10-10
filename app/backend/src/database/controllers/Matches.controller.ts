import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async findAll(req: Request, res: Response): Promise<Response> {
    const response = await this.matchesService.findAll();
    if (!response) {
      return res
        .status(404)
        .json({ message: 'Sorry, the princess is in another castle!' });
    }
    return res.status(200).json(response);
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const response = await this.matchesService.findById(Number(id));
    if (!response) {
      return res
        .status(404)
        .json({ message: 'Sorry, the princess is in another castle!' });
    }
    return res.status(200).json(response);
  }
}

export default MatchesController;
