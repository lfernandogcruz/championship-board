import Matches from '../models/Matches.model';
import ILeaderboard from '../interfaces/ILeaderboard';
import Teams from '../models/Teams.model';
import helpers from '../helpers/leaderboardFunctions';
// import ITeam from '../interfaces/ITeam';

class LeaderboardService {
  public teams = Teams;
  public matches = Matches;

  public homeFindAll = async (): Promise<ILeaderboard[] | null> => {
    const teamsList = await this.teams.findAll({
      include: [
        {
          model: this.matches,
          as: 'teamHome',
          where: { inProgress: false },
          attributes: ['homeTeamGoals', 'awayTeamGoals'],
        },
      ],
    });
    const matchesList = await this.matches.findAll();
    const leaderboard = teamsList
      .map((team) => helpers.teamObjConstructor(team, matchesList, 'home'));
    if (!leaderboard) return null;
    const sortedLeaderboard = helpers.sortLeaderboard(leaderboard);
    return sortedLeaderboard;
  };
}

export default LeaderboardService;
