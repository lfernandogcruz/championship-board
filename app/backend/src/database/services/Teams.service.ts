import ITeam from '../interfaces/ITeam';
import Teams from '../models/Teams.model';

class TeamsService {
  public db = Teams;

  public findAll = async (): Promise<ITeam[] | unknown> => {
    const teams = await this.db.findAll();
    if (!teams) return null as unknown;
    return teams as ITeam[];
  };

  public findById = async (id: number): Promise<ITeam | unknown> => {
    const team = await this.db.findByPk(id);
    if (!team) return null as unknown;
    return team as ITeam;
  };
}

export default TeamsService;
