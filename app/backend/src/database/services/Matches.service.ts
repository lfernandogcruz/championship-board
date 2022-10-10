import IMatch from '../interfaces/IMatch';
import Matches from '../models/Matches.model';

class MatchesService {
  public db = Matches;

  public findAll = async (): Promise<IMatch[] | unknown> => {
    const matches = await this.db.findAll();
    if (!matches) return null as unknown;
    return matches as unknown as IMatch[];
  };

  public findById = async (id: number): Promise<IMatch | unknown> => {
    const match = await this.db.findByPk(id);
    if (!match) return null as unknown;
    return match as unknown as IMatch;
  };
}

export default MatchesService;
