import Matches from '../models/Matches.model';
import ILeaderboard from '../interfaces/ILeaderboard';
import Teams from '../models/Teams.model';
import helpers from '../helpers/leaderboardFunctions';

class LeaderboardService {
  public teams = Teams;
  public matches = Matches;

  private includeHome: {
    model: typeof Matches;
    as: string;
    where: { inProgress: boolean; };
    attributes: string[];
  };

  private includeAway: {
    model: typeof Matches;
    as: string;
    where: { inProgress: boolean; };
    attributes: string[];
  };

  constructor() {
    this.includeHome = {
      model: this.matches,
      as: 'teamHome',
      where: { inProgress: false },
      attributes: ['homeTeamGoals', 'awayTeamGoals'],
    };

    this.includeAway = {
      model: this.matches,
      as: 'teamAway',
      where: { inProgress: false },
      attributes: ['homeTeamGoals', 'awayTeamGoals'],
    };
  }

  public homeFindAll = async (): Promise<ILeaderboard[] | null> => {
    const teamsList = await this.teams.findAll();
    const matchesList = await this.matches.findAll({ where: { inProgress: false } });
    const leaderboard = teamsList
      .map((team) => helpers
        .teamObjConstructor(team, matchesList, 'home')) as unknown as ILeaderboard[];
    if (!leaderboard) return null;
    const sortedLeaderboard = helpers.sortLeaderboard(leaderboard);
    return sortedLeaderboard;
  };

  public awayFindAll = async (): Promise<ILeaderboard[] | null> => {
    const teamsList = await this.teams.findAll();
    const matchesList = await this.matches.findAll({ where: { inProgress: false } });
    const leaderboard = teamsList
      .map((team) => helpers
        .teamObjConstructor(team, matchesList, 'away')) as unknown as ILeaderboard[];
    if (!leaderboard) return null;
    const sortedLeaderboard = helpers.sortLeaderboard(leaderboard);
    return sortedLeaderboard;
  };

  public generalFindAll = async (): Promise<ILeaderboard[] | null> => {
    const teamsList = await this.teams.findAll();
    const matchesList = await this.matches.findAll({ where: { inProgress: false } });
    const leaderboard = teamsList
      .map((team) => helpers
        .teamObjConstructorGeneral(team, matchesList)) as unknown as ILeaderboard[];
    if (!leaderboard) return null;
    const sortedLeaderboard = helpers.sortLeaderboard(leaderboard);
    return sortedLeaderboard;
  };
}

export default LeaderboardService;
