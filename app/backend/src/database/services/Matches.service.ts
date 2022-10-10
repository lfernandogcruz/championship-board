import IMatch from '../interfaces/IMatch';
import Matches from '../models/Matches.model';
import Teams from '../models/Teams.model';

class MatchesService {
  public db = Matches;

  public findAll = async (): Promise<IMatch[] | null> => {
    const matches = await this.db.findAll({ include: [{
      model: Teams,
      as: 'teamHome' as string,
      attributes: { include: ['teamName'], exclude: ['id'] },
    }, {
      model: Teams,
      as: 'teamAway' as string,
      attributes: { include: ['teamName'], exclude: ['id'] },
    },
    ] });
    if (!matches) return null;
    return matches as IMatch[];
  };

  public findById = async (id: number): Promise<IMatch | null> => {
    const match = await this.db.findByPk(id);
    if (!match) return null;
    return match as IMatch;
  };
}

export default MatchesService;
