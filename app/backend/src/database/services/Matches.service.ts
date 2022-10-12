import IMatch from '../interfaces/IMatch';
import IQueryProgress from '../interfaces/IQueryProgress';
import Matches from '../models/Matches.model';
import Teams from '../models/Teams.model';

class MatchesService {
  public db = Matches;

  public findAll = async (): Promise<IMatch[] | null> => {
    const matches = await this.db.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome' as string,
          attributes: { include: ['teamName'], exclude: ['id'] },
        },
        {
          model: Teams,
          as: 'teamAway' as string,
          attributes: { include: ['teamName'], exclude: ['id'] },
        },
      ],
    });
    if (!matches) return null;
    return matches as IMatch[];
  };

  public findAllQuery = async (query: IQueryProgress): Promise<IMatch[] | null> => {
    const matches = await this.db.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome' as string,
          attributes: { include: ['teamName'], exclude: ['id'] },
        },
        {
          model: Teams,
          as: 'teamAway' as string,
          attributes: { include: ['teamName'], exclude: ['id'] },
        },
      ],
      where: { inProgress: query.inProgress },
    });
    if (!matches) return null;
    return matches as IMatch[];
  };

  public findById = async (id: number): Promise<IMatch | null> => {
    const match = await this.db.findByPk(id);
    if (!match) return null;
    return match as IMatch;
  };

  public create = async (match: IMatch): Promise<IMatch | null> => {
    const newMatch = await this.db.create(match);
    if (!newMatch) return null;
    return newMatch as IMatch;
  };

  public finishMatch = async (id: number): Promise<IMatch | null> => {
    const match = await this.db.findByPk(id);
    if (!match) return null;
    const finishedMatch = await match.update({ inProgress: false });
    return finishedMatch as IMatch;
  };

  public updateScoreMatch = async (
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<IMatch | null> => {
    const match = await this.db.findByPk(id);
    if (!match) return null;
    const updatedMatch = await match.update({ homeTeamGoals, awayTeamGoals });
    return updatedMatch as IMatch;
  };
}

export default MatchesService;
