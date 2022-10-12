import ILeaderboard from '../interfaces/ILeaderboard';
import IMatch from '../interfaces/IMatch';
import ITeam from '../interfaces/ITeam';

const LeaderboardFunctions = {
  teamObjConstructor: (team: ITeam, matchesList: IMatch[], wich: string) => {
    const teamObject = {
      name: team.teamName,
      totalPoints: LeaderboardFunctions.totalPoints(team, matchesList, wich),
      totalGames: LeaderboardFunctions.totalGames(team, matchesList, wich),
      totalVictories: LeaderboardFunctions.totalVictories(team, matchesList, wich),
      totalDraws: LeaderboardFunctions.totalDraws(team, matchesList, wich),
      totalLosses: LeaderboardFunctions.totalLosses(team, matchesList, wich),
      goalsFavor: LeaderboardFunctions.goalsFavor(team, matchesList, wich),
      goalsOwn: LeaderboardFunctions.goalsOwn(team, matchesList, wich),
    };
    const innerObj = LeaderboardFunctions.teamObjConstructor2(
      teamObject.goalsFavor,
      teamObject.goalsOwn,
      teamObject.totalPoints,
      teamObject.totalGames,
    );
    return { ...teamObject, ...innerObj };
  },
  teamObjConstructor2: (
    goalsFavor: number,
    goalsOwn: number,
    totalPoints: number,
    totalGames: number,
  ) => {
    const innerObj = {
      goalsBalance: LeaderboardFunctions.goalsBalance(goalsFavor, goalsOwn),
      efficiency: LeaderboardFunctions.efficiency(totalPoints, totalGames),
    };
    return innerObj;
  },

  totalPoints: (team: ITeam, matchesList: IMatch[], wich: string) => {
    const mainTeam = wich === 'home' ? 'homeTeam' : 'awayTeam';
    const mainTeamGoals = wich === 'home' ? 'homeTeamGoals' : 'awayTeamGoals';
    const opponentGoals = wich === 'home' ? 'awayTeamGoals' : 'homeTeamGoals';
    const totalPoints = matchesList
      .filter((match) => match[mainTeam] === team.id)
      .reduce((acc, match) => {
        if (match[mainTeamGoals] > match[opponentGoals]) return acc + 3;
        if (match[mainTeamGoals] === match[opponentGoals]) return acc + 1;
        return acc;
      }, 0);
    return totalPoints;
  },

  totalGames: (team: ITeam, matchesList: IMatch[], wich: string) => {
    const mainTeam = wich === 'home' ? 'homeTeam' : 'awayTeam';
    // match[mainTeam] === team.id
    const totalGames = matchesList.filter((match) => match[mainTeam] === team.id).length;
    return totalGames;
  },

  totalVictories: (team: ITeam, matchesList: IMatch[], wich: string) => {
    const mainTeam = wich === 'home' ? 'homeTeam' : 'awayTeam';
    const mainTeamGoals = wich === 'home' ? 'homeTeamGoals' : 'awayTeamGoals';
    const opponentGoals = wich === 'home' ? 'awayTeamGoals' : 'homeTeamGoals';
    const totalVictories = matchesList
      .filter((match) => match[mainTeam] === team.id)
      .filter((match) => match[mainTeamGoals] > match[opponentGoals]).length;
    return totalVictories;
  },

  totalDraws: (team: ITeam, matchesList: IMatch[], wich: string) => {
    const mainTeam = wich === 'home' ? 'homeTeam' : 'awayTeam';
    const mainTeamGoals = wich === 'home' ? 'homeTeamGoals' : 'awayTeamGoals';
    const opponentGoals = wich === 'home' ? 'awayTeamGoals' : 'homeTeamGoals';
    const totalDraws = matchesList
      .filter((match) => match[mainTeam] === team.id)
      .filter((match) => match[mainTeamGoals] === match[opponentGoals]).length;
    return totalDraws;
  },

  totalLosses: (team: ITeam, matchesList: IMatch[], wich: string) => {
    const mainTeam = wich === 'home' ? 'homeTeam' : 'awayTeam';
    const mainTeamGoals = wich === 'home' ? 'homeTeamGoals' : 'awayTeamGoals';
    const opponentGoals = wich === 'home' ? 'awayTeamGoals' : 'homeTeamGoals';
    const totalLosses = matchesList
      .filter((match) => match[mainTeam] === team.id)
      .filter((match) => match[mainTeamGoals] < match[opponentGoals]).length;
    return totalLosses;
  },

  goalsFavor: (team: ITeam, matchesList: IMatch[], wich: string) => {
    const mainTeam = wich === 'home' ? 'homeTeam' : 'awayTeam';
    const mainTeamGoals = wich === 'home' ? 'homeTeamGoals' : 'awayTeamGoals';
    const goalsFavor = matchesList.reduce((acc, match) => {
      if (match[mainTeam] === team.id) return acc + match[mainTeamGoals];
      return acc;
    }, 0);
    return goalsFavor;
  },

  goalsOwn: (team: ITeam, matchesList: IMatch[], wich: string) => {
    const mainTeam = wich === 'home' ? 'homeTeam' : 'awayTeam';
    const opponentGoals = wich === 'home' ? 'awayTeamGoals' : 'homeTeamGoals';
    const goalsOwn = matchesList.reduce((acc, match) => {
      if (match[mainTeam] === team.id) return acc + match[opponentGoals];
      return acc;
    }, 0);
    return goalsOwn;
  },

  goalsBalance: (goalsFavor: number, goalsOwn: number) => {
    const goalsBalance = goalsFavor - goalsOwn;
    return goalsBalance;
  },

  efficiency: (totalPoints: number, totalGames: number) => {
    // P/(J*3)*100
    const percentage = (totalPoints / (totalGames * 3)) * 100;
    return `${percentage.toFixed(2)}%`;
  },

  sortLeaderboard: (leaderboard: ILeaderboard[]) => {
    const sortedLeaderboard = leaderboard.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      return 0;
    });
    return sortedLeaderboard;
  },
};

export default LeaderboardFunctions;
