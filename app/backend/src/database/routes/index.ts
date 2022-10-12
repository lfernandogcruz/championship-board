import loginRouter from './login.route';
import teamsRouter from './teams.route';
import matchesRouter from './matches.route';
import leaderboardRouter from './leaderboard.route';

export default {
  login: loginRouter,
  teams: teamsRouter,
  matches: matchesRouter,
  leaderboard: leaderboardRouter,
};
